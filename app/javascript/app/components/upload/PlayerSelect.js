import React from 'react';
import {MenuItem, TextField} from "@material-ui/core";
import gql from "graphql-tag";
import {graphql, withApollo} from 'react-apollo';
import renderWhileLoading from "../../renderWhileLoading";
import { compose } from 'recompose';

@compose(
    graphql(gql`
        query {
            upload @client {
                selectedPlayer
                players {
                    id
                    name
                }
            }
        }
    `),
    graphql(gql`
        mutation setSelectedPlayer($player: String!) {
            setSelectedPlayer(player: $player) @client
        }
    `),
    renderWhileLoading()
)
@withApollo
class PlayerSelect extends React.Component {
    handleChange = e => {
        this.props.mutate({
            variables: {
                player: e.target.value
            }
        });
    };

    render() {
        const { data: { loading } } = this.props;
        const {
            data: {
                upload: {
                    selectedPlayer,
                    players
                },
            }
        } = this.props;
        return(
          <TextField
            select
            margin={'normal'}
            label={'Name'}
            fullWidth
            onChange={this.handleChange}
            value={selectedPlayer}
          >
              {
                  players.map(p => (
                      <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                  ))
              }
          </TextField>
        )
    }
}

export default PlayerSelect;