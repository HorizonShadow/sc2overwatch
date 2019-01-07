import React from 'react';
import {graphql} from "react-apollo";
import GameCard from "../GameCard";
import GET_ACCUSED_PLAYERS from '../../graphql/GetAccusedPlayers.graphql';
import renderWhileLoading from "../../renderWhileLoading";
import renderForError from "../../renderForError";
import {compose} from "recompose";


@compose(
    graphql(GET_ACCUSED_PLAYERS),
    renderWhileLoading(),
    renderForError()
)
class GamePlayerList extends React.Component {

    componentWillMount() {
        window.gtag('event', 'screen_view', {
            'screen_name': 'Recent Reports'
        });
    }

    render() {
        const {data: {accusedPlayers} } = this.props;
        return (
          <React.Fragment>
              {
                  accusedPlayers.map(c => (
                      <GameCard player={c.player} game_player={c} key={c.id} />
                  ))
              }
          </React.Fragment>
        )
    }
}

export default GamePlayerList;