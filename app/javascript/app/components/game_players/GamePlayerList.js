import React from 'react';
import {graphql} from "react-apollo";
import GamePlayerFields from '../../graphql/GamePlayerFields.graphql';
import PlayerFields from '../../graphql/PlayerFields.graphql';
import GameFields from '../../graphql/GameFields.graphql';
import gql from "graphql-tag";
import GameCard from "../GameCard";


@graphql(gql`
    {
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
`)
class GamePlayerList extends React.Component {

    componentWillMount() {
        window.gtag('event', 'screen_view', {
            'screen_name': 'Game Player List'
        });
    }

    render() {
        const {data: {loading, error, accusedPlayers} } = this.props;
        if (loading) return 'Loading';
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
