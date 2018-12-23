import React from 'react';
import {graphql} from "react-apollo";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Step,
    StepContent,
    StepLabel,
    Stepper,
} from "@material-ui/core";
import { withApollo } from "react-apollo";
import SubmitButton from "../SubmitButton";
import { withSnackbar } from 'notistack';
import ReplayDropzone from "../ReplayDropzone";
import PlayerSelect from "./PlayerSelect";
import EvidenceTextField from "./EvidenceTextField";
import GamePlayerFields from '../../graphql/GamePlayerFields.graphql';
import PlayerFields from '../../graphql/PlayerFields.graphql';
import gql from "graphql-tag";
import GameFields from '../../graphql/GameFields.graphql';

const GET_ACCUSED_PLAYERS = gql`
    query GET_ACCUSED_PLAYERS {
        accusedPlayers {
            ...GamePlayerFields
            player {
                ...PlayerFields
            }
            game {
                ...GameFields
                players {
                    ...PlayerFields
                }
            }
        }
    }
    ${GamePlayerFields}
    ${PlayerFields}
    ${GameFields}
`;

const GET_PLAYERS = gql`
    query GET_PLAYERS {
        players {
            ...PlayerFields
            gamePlayers {
                ...GamePlayerFields
            }
        }
    }
    ${PlayerFields}
    ${GamePlayerFields}
`;

@withSnackbar
@withApollo
@graphql(gql`
    mutation ADD_ACCUSATION($playerId: ID!, $gameId: ID!, $evidence: String!) {
        addAccusation(playerId: $playerId, evidence: $evidence, gameId: $gameId) {
            gamePlayer {
                ...GamePlayerFields
                player {
                    ...PlayerFields
                }
            }
        }
    }
    ${GamePlayerFields}
    ${PlayerFields}
    ${GameFields}
`, {
    options: {
        update: (cache, {data: { addAccusation }}) => {
            try {
                const { accusedPlayers } = cache.readQuery({ query: GET_ACCUSED_PLAYERS });
                cache.writeQuery({
                    query: GET_ACCUSED_PLAYERS,
                    data: { accusedPlayers: accusedPlayers.concat([addAccusation.gamePlayer]) }
                });
            } catch(e) {
                console.error("Accused players not loaded yet");
            }

            try {
                const { players } = cache.readQuery({ query: GET_PLAYERS });
                const player = players.find(c => c.id === addAccusation.gamePlayer.player.id);
                if(!player) {
                    cache.writeQuery({
                        query: GET_PLAYERS,
                        data: {players: players.concat([addAccusation.gamePlayer.player])}
                    })
                }
            } catch(e) {
                console.error("Players not loaded yet");
            }
        }
    }
})
class ReplayForm extends React.Component {

    state = {
        name: '',
        evidence: '',
        players: [],
        uploadStep: 0,
    };

    handleUploadFinished = ({players, replay_id}) => {
        this.setState({
            players: players,
            game_id: replay_id,
            uploadStep: 1,
        });
    };

    formValid() {
        const { name, uploadStep, evidence } = this.state;
        return name.toString().length > 0 && uploadStep === 1 && evidence.length > 0;
    }

    handleFormSubmit = async e => {
        const { mutate, enqueueSnackbar, client } = this.props;
        const { game_id, name, evidence } = this.state;
        e.preventDefault();
        this.setState({ submitting: true });
        try {
            await mutate({
                variables: {
                    gameId: game_id,
                    playerId: name,
                    evidence: evidence
                }
            });
            enqueueSnackbar('Replay Uploaded', { variant: 'success' });
        } catch(e) {
            enqueueSnackbar("You've already reported this player", { variant: 'error' });
        } finally {
            this.setState({
                submitting: false
            });
            client.writeData({ data: { uploadModalOpen: false }});
        }

    };

    handlePlayerChange = name => {
        this.setState({ name: name });
    };

    handleEvidenceChange = evidence => {
        this.setState({ evidence: evidence });
    };

    handleCloseClick = () => {
        const { client } = this.props;
        client.writeData({ data: { uploadModalOpen: false }})
    };

    render() {
        const {
            submitting,
            name,
            uploadStep,
            players,
            evidence
        } = this.state;

        return(
            <form onSubmit={this.handleFormSubmit}>
                <DialogTitle>Report a player</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={uploadStep} orientation={'vertical'}>
                        <Step>
                            <StepLabel>Upload a replay</StepLabel>
                            <StepContent>
                                <ReplayDropzone onUploadFinished={this.handleUploadFinished}/>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Enter Details</StepLabel>
                            <StepContent>
                                <PlayerSelect
                                  players={players}
                                  onChange={this.handlePlayerChange}
                                  value={name}
                                />
                                <EvidenceTextField
                                    value={evidence}
                                    onChange={this.handleEvidenceChange}
                                />
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseClick}>Close</Button>
                    <SubmitButton disabled={!this.formValid()} loading={submitting}/>
                </DialogActions>
            </form>
        )
    }
}

export default ReplayForm;
