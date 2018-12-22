import React from 'react';
import {
    Dialog,
    withMobileDialog,
    withStyles
} from '@material-ui/core';
import ReplayForm from "./ReplayForm";
import gql from "graphql-tag";
import {graphql, withApollo} from "react-apollo";

const styles = theme => ({
    paper: {
        overflowY: 'hidden'
    }
});

const GET_MODAL_STATE = gql`
    {
        uploadModalOpen @client
    }
`;

@withApollo
@graphql(GET_MODAL_STATE)
@withStyles(styles, { withTheme: true})
@withMobileDialog()
class UploadModal extends React.Component {

    componentDidMount() {
        window.gtag('event', 'screen_view', {
            'screen_name': 'Upload Modal'
        });
    }

    render() {
        const { fullScreen, classes, client, data: { uploadModalOpen } } = this.props;
        return(
            <Dialog
                open={uploadModalOpen}
                fullScreen={fullScreen}
                fullWidth
                onClose={() => client.writeData({ data: { uploadModalOpen: false }})}
                classes={classes}
            >
                <ReplayForm />
            </Dialog>
        )
    }
}

export default UploadModal;
