import React from 'react';
import ADD_ACCUSATION from "../../graphql/AddAccusation.graphql";
import GET_ACCUSED_PLAYERS from "../../graphql/GetAccusedPlayers.graphql";
import GET_PLAYERS from "../../graphql/GetPlayers.graphql";
import {graphql, withApollo} from 'react-apollo';
import {withSnackbar} from "notistack";
import SubmitButton from "../SubmitButton";
import gql from "graphql-tag";
import {compose} from "recompose";

const GET_STATE = gql`
    {
        upload @client {
            evidence @client
            selectedPlayer @client
            step @client
        }
    }
`;

@compose(
    withApollo,
    withSnackbar,
    graphql(GET_STATE),
    graphql(
        ADD_ACCUSATION, {
            options: {
                update: (cache, {data: {addAccusation}}) => {
                    try {
                        const {accusedPlayers} = cache.readQuery({query: GET_ACCUSED_PLAYERS});
                        cache.writeQuery({
                            query: GET_ACCUSED_PLAYERS,
                            data: {accusedPlayers: accusedPlayers.concat([addAccusation.gamePlayer])}
                        });
                    } catch (e) {
                        console.error("Accused players not loaded yet");
                    }
                    try {
                        const {players} = cache.readQuery({query: GET_PLAYERS});
                        const player = players.find(c => c.id === addAccusation.gamePlayer.player.id);
                        if (!player) {
                            cache.writeQuery({
                                query: GET_PLAYERS,
                                data: {players: players.concat([addAccusation.gamePlayer.player])}
                            })
                        }
                    } catch (e) {
                        console.error("Players not loaded yet");
                    }
                }
            }
        }
    )
)
class UploadSubmitButton extends React.Component {

    state = {
        submitting: false
    };

    formValid = () => {
        const { data: { upload: { evidence, selectedPlayer, step }}} = this.props;
        console.log(this.props);
        return selectedPlayer.toString().length > 0 && step === 1 && evidence.length > 0;
    };

    handleSubmit = async e => {
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

    render() {
        const { submitting } = this.state;
        return(
            <SubmitButton
                onClick={this.handleSubmit}
                loading={submitting}
                disabled={!this.formValid()}
            />
        )
    }
}

export default UploadSubmitButton;