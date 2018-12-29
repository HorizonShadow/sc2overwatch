import React from 'react';
import {graphql} from "react-apollo";
import GameCard from "../GameCard";
import Loader from "../Loader";
import GET_GAMES from '../../graphql/GetGames.graphql';

@graphql(GET_GAMES)
class GameList extends React.Component {

    componentWillMount() {
        const { playerId } = this.props;
        window.gtag('event', 'screen_view', {
            'screen_name': `Game List - ${playerId}`
        });
    }
    render() {
        const { data: { loading, error, games } } = this.props;
        if(loading) return <Loader />;
        if(error) return "Error";
        return(
            <React.Fragment>
                {
                    games.map(g => (
                        <GameCard player={g.player} game_player={g} key={g.id} />
                    ))
                }
            </React.Fragment>
        )
    }
}

export default GameList;
