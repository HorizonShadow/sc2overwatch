import React from 'react';
import {Fab, withStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {withApollo} from "react-apollo";


const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 2
    }
});

@withApollo
@withStyles(styles, { withTheme: true })
class UploadReplayButton extends React.Component {

    render() {
        const { classes, client } = this.props;
        return(
            <Fab
                color={'primary'}
                className={classes.fab}
                onClick={() => client.writeData({ data: { uploadModalOpen: true }})}
            >
                <AddIcon />
            </Fab>
        )
    }
}

export default UploadReplayButton;
