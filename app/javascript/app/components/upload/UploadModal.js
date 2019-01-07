import React from 'react';
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    withMobileDialog,
    withStyles
} from '@material-ui/core';
import {graphql, withApollo} from "react-apollo";
import gql from "graphql-tag";
import {withSnackbar} from "notistack";
import AccusationSteps from "./AccusationSteps";
import {compose} from "recompose";
import renderWhenLoading from "../../renderWhileLoading";
import renderForError from "../../renderForError";
import UploadSubmitButton from "./UploadSubmitButton";

const GET_MODAL_OPEN = gql`
    {
        uploadModalOpen @client
    }
`;

const styles = {
    paper: {
        overflowY: 'hidden'
    }
};


@compose(
    withApollo,
    graphql(GET_MODAL_OPEN),
    withMobileDialog(),
    renderWhenLoading(),
    renderForError(),
    withSnackbar,
    withStyles(styles)
)
class UploadModal extends React.Component {

    componentDidMount() {
        window.gtag('event', 'Open upload modal');
    }

    handleCloseClick = () => {
        const { client } = this.props;
        client.writeData({ data: { uploadModalOpen: false }})
    };

    render() {
        const {
            fullScreen,
            classes,
            client,
            data: {
                uploadModalOpen
            }
        } = this.props;
        return(
            <Dialog
                open={uploadModalOpen}
                fullScreen={fullScreen}
                fullWidth
                onClose={() => client.writeData({ data: { uploadModalOpen: false }})}
                classes={classes}
            >
                <DialogTitle>Report a player</DialogTitle>
                <DialogContent>
                    <AccusationSteps />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseClick}>Close</Button>
                    <UploadSubmitButton />
                </DialogActions>
            </Dialog>
        )
    }
}

export default UploadModal;
