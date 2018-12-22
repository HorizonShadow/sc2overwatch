import React from 'react';
import gql from "graphql-tag";
import GameFields from '../../graphql/GameFields.graphql';
import {graphql} from "react-apollo";
import GamePlayerFields from '../../graphql/GamePlayerFields.graphql';
import PlayerFields from '../../graphql/PlayerFields.graphql';
import GameCard from "../GameCard";
import Loader from "../Loader";
const GET_GAMES = gql`
    query GET_GAMES($playerId: ID!) {
        games(playerId: $playerId) {
            ...GamePlayerFields
            game {
                ...GameFields
                players {
                    ...PlayerFields
                }
            }
            player {
                ...PlayerFields
            }
        }
    }
    ${GameFields}
    ${GamePlayerFields}
    ${PlayerFields}
`;

@graphql(GET_GAMES)
class GameList extends React.Component {

    componentWillMount() {
        window.gtag('event', 'screen_view', {
            'screen_name': 'Game List'
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
