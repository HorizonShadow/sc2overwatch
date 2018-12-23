import React from 'react';
import {
    withStyles,
    ExpansionPanelSummary,
    CardMedia,
    CardContent,
    Typography,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Button,
    ExpansionPanel,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Grid,
} from "@material-ui/core";
import { graphql } from 'react-apollo';
import GamePlayerInfo from "./GamePlayerInfo";
import SubmitButton from "../SubmitButton";
import VerdictRadios from "./VerdictRadios";
import WinnerSelect from "./WinnerSelect";
import { withSnackbar } from "notistack";
import ACCUSE_PLAYER from '../../graphql/AccusePlayer.graphql';

const styles = theme => ({
    media: {
        height: 90
    },
    expansionSummaryRoot: {
        margin: 0,
        padding: 0
    },
    expansionSummaryExpanded: {
        margin: '0 !important',
        padding: 0
    },
    expansionSummaryContent: {
        display: 'block',
        margin: 0,
        padding: 0
    },
    stepper: {
        margin: 0,
        padding: 0,
        marginTop: theme.spacing.unit * 3
    }
});

@withSnackbar
@graphql(ACCUSE_PLAYER)
@withStyles(styles)
class GamePlayerExpansion extends React.Component {

    state = {
        step: 0,
        done: false,
        winner: '',
        submitting: false,
        verdict: null
    };

    submit = async e => {
        e.preventDefault();
        const { mutate, game_player, enqueueSnackbar } = this.props;
        const { winner, verdict } = this.state;

        this.setState({ submitting: true });
        try {
            await mutate({
                variables: {
                    gamePlayerId: game_player.id,
                    winnerId: winner,
                    verdict: verdict
                }
            });
        } catch(e) {
            enqueueSnackbar("You've already reported this player", { variant: 'error' });
            console.log(e);
        } finally {
            this.setState({ submitting: false });
        }

    };

    handleDownloadClick = () => {
        this.setState({
            step: 1
        })
    };

    handleVerdictChange = e => {
        this.setState({
            verdict: e.target.value
        });
    };

    handleWinnerChange = e => {
        this.setState({
            winner: e.target.value,
            done: true
        });
    };

    formValid = () => {
        const { winner, verdict } = this.state;
        return winner.length > 0 && verdict;
    };


    render() {
        const { classes, game_player } = this.props;
        const { step, winner, submitting, verdict } = this.state;
        return(
            <form onSubmit={this.submit}>
                <ExpansionPanel classes={{expanded: classes.expansionSummaryExpanded}}>
                    <ExpansionPanelSummary classes={{
                        root: classes.expansionSummaryRoot,
                        content: classes.expansionSummaryContent,
                        expanded: classes.expansionSummaryExpanded
                    }}>
                    <CardMedia
                        className={classes.media}
                        image={`/img/maps/${game_player.game.map.split(' ').join('_')}.jpg`}
                    />
                        <CardContent>
                            <GamePlayerInfo game_player={game_player}/>
                        </CardContent>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant={'h6'}>Evidence</Typography>
                                {
                                    game_player.evidence.split('\n').map((d, i) => (
                                        <Typography key={i}>{d}</Typography>
                                    ))
                              }
                            </Grid>
                            <Grid item xs={12}>
                                <Stepper activeStep={step} orientation={'vertical'} classes={{root: classes.stepper}}>
                                    <Step>
                                        <StepLabel>Watch the game</StepLabel>
                                        <StepContent>
                                            <Button component={'a'} href={game_player.game.url} target={'blank'} onClick={this.handleDownloadClick}>
                                                Download Replay
                                            </Button>
                                        </StepContent>
                                    </Step>
                                    <Step>
                                        <StepLabel>Verify the winner</StepLabel>
                                        <StepContent>
                                            <WinnerSelect
                                                players={game_player.game.players}
                                                onChange={this.handleWinnerChange}
                                                value={winner}
                                            />
                                            <VerdictRadios
                                                value={verdict}
                                                onChange={this.handleVerdictChange}
                                            />
                                        </StepContent>
                                    </Step>
                                </Stepper>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <SubmitButton
                          disabled={!this.formValid()}
                          loading={submitting}
                        />
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </form>
        )
    }
}

export default GamePlayerExpansion;
