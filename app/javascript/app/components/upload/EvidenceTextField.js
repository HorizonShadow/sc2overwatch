import React from 'react';
import {TextField} from "@material-ui/core";
import {withApollo, graphql} from "react-apollo";
import gql from "graphql-tag";
import {compose} from "recompose";

@compose(
    withApollo,
    graphql(gql`
        {
            upload {
                evidence @client
            }
        }
    `),
    graphql(gql`
        mutation SetEvidence($evidence: String!) {
            setEvidence(evidence: $evidence) @client
        }
    `)
)
class EvidenceTextField extends React.Component {

    handleChange = e => {
        const { mutate } = this.props;
        mutate({
            variables: {
                evidence: e.target.value
            }
        });
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
