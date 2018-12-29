import React from 'react';
import {CircularProgress, Typography, withStyles} from "@material-ui/core";
import Dropzone from "react-dropzone";
import classNames from 'classnames';
import {withSnackbar} from "notistack";

const styles = {
    input: {
        display: 'none'
    },
    dropzoneRoot: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        display: 'flex',
        textAlign: 'center'
    },
};

@withSnackbar
@withStyles(styles)
class ReplayDropzone extends React.Component {

    state = {
        uploading: false
    };

    handleDrop = async files => {
        const { onUploadFinished, onError, enqueueSnackbar } = this.props;
        this.setState({ uploading: true });
        const formData = new FormData();
        formData.append('file', files[0]);
        try {
            const resp = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            const json = await resp.json();
            onUploadFinished({
                players: json.players,
                replay_id: json.replay_id
            });
        } catch(e) {
            enqueueSnackbar("An error occurred while processing the replay", { variant: 'error' });
            gtag('event', 'exception', {
                description: e,
                fatal: false
            });
            console.log(e);
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { uploading } = this.state;

        return(
          <Dropzone
            onDrop={this.handleDrop}
          >
              {
                  ({getRootProps, getInputProps, isDragActive}) => (
                      <div className={classNames(classes.dropzoneRoot, 'dropzone', { 'dropzone--isActive': isDragActive })}
                           {...getRootProps()}>
                          <input className={classes.input} {...getInputProps()} />
                          <div>
                              {
                                  uploading
                                    ? <CircularProgress/>
                                    : <Typography variant={'subtitle1'}>
                                        Click here, or drop a file to upload
                                    </Typography>
                              }
                          </div>
                      </div>
                  )
              }
          </Dropzone>

        )
    }
}

export default ReplayDropzone;