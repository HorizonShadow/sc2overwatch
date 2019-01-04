import React from 'react';
import {TextField} from "@material-ui/core";
import {withApollo, graphql} from "react-apollo";
import gql from "graphql-tag";

@withApollo
@graphql(gql`
    {
        evidence @client
    }
`)
class EvidenceTextField extends React.Component {

    handleChange = e => {
        const { client } = this.props;
        client.writeData({
            data: {
                evidence: e.target.value
            }
        })
    };

    render() {
        const { data: { evidence } } = this.props;
        return(
            <TextField
                label={'Evidence'}
                margin={'normal'}
                multiline
                fullWidth
                helperText={'*required'}
                value={evidence}
                onChange={this.handleChange}
            />
        )
    }
}

export default EvidenceTextField;
