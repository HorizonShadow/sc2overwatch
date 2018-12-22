import React from 'react';
import {MenuItem, TextField} from "@material-ui/core";

class PlayerSelect extends React.Component {

    handleChange = e => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };

    render() {
        const { players, value } = this.props;
        return(
          <TextField
            select
            margin={'normal'}
            label={'Name'}
            fullWidth
            onChange={this.handleChange}
            value={value}
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