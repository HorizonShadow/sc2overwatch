import React from 'react';
import {Step, StepContent, StepLabel, Stepper} from "@material-ui/core";
import ReplayDropzone from "./ReplayDropzone";
import gql from "graphql-tag";
import {graphql, withApollo} from 'react-apollo';
import PlayerSelect from "./PlayerSelect";
import EvidenceTextField from "./EvidenceTextField";

@withApollo
@graphql(gql`
    {
        uploadStep @client
    }
`)
class AccusationSteps extends React.Component {

    state = {
        players: []
    };

    handleUploadFinished = ({players, replay_id}) => {
        const { client } = this.props;
        this.setState({ players: players });
        client.writeData({
            data: {
                uploadStep: 1,
                gameId: replay_id
            }
        })
    };

    render() {
        const { data: { uploadStep } } = this.props;
        const { players } = this.state;
        return(
            <Stepper activeStep={uploadStep} orientation={'vertical'}>
                <Step>
                    <StepLabel>Upload a replay</StepLabel>
                    <StepContent>
                        <ReplayDropzone onUploadFinished={this.handleUploadFinished}/>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Enter Details</StepLabel>
                    <StepContent>
                        <PlayerSelect players={players} />
                        <EvidenceTextField />
                    </StepContent>
                </Step>
            </Stepper>
        )
    }
}

export default AccusationSteps;