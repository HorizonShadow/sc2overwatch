import React from 'react';
import {Step, StepContent, StepLabel, Stepper} from "@material-ui/core";
import ReplayDropzone from "./UploadModal";
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

    };

    render() {
        const { players, data: { uploadStep } } = this.props;
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