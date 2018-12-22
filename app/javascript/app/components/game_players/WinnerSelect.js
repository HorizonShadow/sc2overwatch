import React from 'react';
import {MenuItem, TextField} from "@material-ui/core";

class WinnerSelect extends React.Component {
    render() {
        const { onChange, value, players } = this.props;
        return(
          <TextField
            select
            fullWidth
            label={'Select the winner'}
            onChange={onChange}
            value={value}>
              {
                  players.map(p => (
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                  ))
              }
          </TextField>
        )
    }
}

export default WinnerSelect;