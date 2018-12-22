import React from 'react';
import {TextField} from "@material-ui/core";

class EvidenceTextField extends React.Component {

    handleChange = e => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };

    render() {
        const { value } = this.props;
        return(
            <TextField
                label={'Evidence'}
                margin={'normal'}
                multiline
                fullWidth
                helperText={'*required'}
                value={value}
                onChange={this.handleChange}
            />
        )
    }
}

export default EvidenceTextField;
