import React from 'react';
import {graphql} from "react-apollo";
import GameCard from "../GameCard";
import Loader from "../Loader";
import GET_ACCUSED_PLAYERS from '../../graphql/GetAccusedPlayers.graphql';


@graphql(GET_ACCUSED_PLAYERS)
class GamePlayerList extends React.Component {

    componentWillMount() {
        window.gtag('event', 'screen_view', {
            'screen_name': 'Game Player List'
        });
    }

    render() {
        const {data: {loading, error, accusedPlayers} } = this.props;
        console.log(this.props);
        if (loading) return <Loader />;
        if (error) return 'Error';
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
