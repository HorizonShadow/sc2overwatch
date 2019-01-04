import React from 'react';
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, Step, StepContent, StepLabel, Stepper,
    withMobileDialog,
    withStyles
} from '@material-ui/core';
import {graphql, withApollo} from "react-apollo";
import ReplayDropzone from "./ReplayDropzone";
import PlayerSelect from "./PlayerSelect";
import EvidenceTextField from "./EvidenceTextField";
import SubmitButton from "../SubmitButton";
import ADD_ACCUSATION from "../../graphql/AddAccusation.graphql";
import GET_ACCUSED_PLAYERS from "../../graphql/GetAccusedPlayers.graphql";
import GET_PLAYERS from "../../graphql/GetPlayers.graphql";
import gql from "graphql-tag";
import {withSnackbar} from "notistack";
import AccusationSteps from "./AccusationSteps";

const GET_MODAL_OPEN = gql`
    {
        uploadModalOpen @client
    }
`;

const GET_STATE = gql`    
    {
        evidence @client
        selectedPlayer @client
        uploadStep @client
    }
`;

const styles = theme => ({
    paper: {
        overflowY: 'hidden'
    }
});

@withApollo
@graphql(ADD_ACCUSATION, {
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
@graphql(GET_MODAL_OPEN)
@withStyles(styles, { withTheme: true})
@withMobileDialog()
@withSnackbar
class UploadModal extends React.Component {

    state = {
        submitting: false
    };

    componentDidMount() {
        window.gtag('event', 'Open upload modal');
    }

    formValid() {
        const { client: { cache } } = this.props;
        const {evidence, selectedPlayer, uploadStep} = cache.readQuery({
            query: GET_STATE
        });
        return selectedPlayer.toString().length > 0 && uploadStep === 1 && evidence.length > 0;
    }

    handleFormSubmit = async e => {
        const { mutate, enqueueSnackbar, client } = this.props;
        const { game_id } = this.state;
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
            gtag('event', 'Successfully uploaded replay', {
                'event_label': game_id
            });
        } catch(e) {
            enqueueSnackbar("You've already reported this player", { variant: 'error' });
            console.error(e);
            gtag('event', 'exception', {
                description: e,
                fatal: false
            });
        } finally {
            this.setState({
                submitting: false
            });
            client.writeData({ data: { uploadModalOpen: false }});
        }

    };

    handleCloseClick = () => {
        const { client } = this.props;
        client.writeData({ data: { uploadModalOpen: false }})
    };

    render() {
        const {
            fullScreen,
            classes,
            client,
            data: {
                uploadModalOpen
            }
        } = this.props;
        const {
            submitting,
        } = this.state;
        return(
            <Dialog
                open={uploadModalOpen}
                fullScreen={fullScreen}
                fullWidth
                onClose={() => client.writeData({ data: { uploadModalOpen: false }})}
                classes={classes}
            >
                <DialogTitle>Report a player</DialogTitle>
                <DialogContent>
                    <AccusationSteps />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseClick}>Close</Button>
                    <SubmitButton
                        onClick={this.handleFormSubmit}
                        disabled={!this.formValid()}
                        loading={submitting}
                    />
                </DialogActions>
            </Dialog>
        )
    }
}

export default UploadModal;
