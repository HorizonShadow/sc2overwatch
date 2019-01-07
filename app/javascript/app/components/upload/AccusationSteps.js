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
        upload @client {
            step
        }
    }
`)
class AccusationSteps extends React.Component {
    render() {
        const { data: { upload: { step } } } = this.props;
        return(
            <Stepper activeStep={step} orientation={'vertical'}>
                <Step>
                    <StepLabel>Upload a replay</StepLabel>
                    <StepContent>
                        <ReplayDropzone />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Enter Details</StepLabel>
                    <StepContent>
                        <PlayerSelect />
                        <EvidenceTextField />
                    </StepContent>
                </Step>
            </Stepper>
        )
    }
}

export default AccusationSteps;