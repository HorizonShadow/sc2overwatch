import React from 'react';
import {MenuItem, TextField} from "@material-ui/core";
import gql from "graphql-tag";
import {graphql, withApollo} from 'react-apollo';

@withApollo
@graphql(gql`
    {
        selectedPlayer @client      
    } 
`)
class PlayerSelect extends React.Component {

    handleChange = e => {
        const { client } = this.props;
        client.writeData({
            data: {
                selectedPlayer: e.target.value
            }
        });

    };

    render() {
        const { players, data: { selectedPlayer } } = this.props;
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
                    <MenuItem key={p.players_id} value={p.players_id}>{p.player.players_name}</MenuItem>
                  ))
              }
          </TextField>
        )
    }
}

export default PlayerSelect;