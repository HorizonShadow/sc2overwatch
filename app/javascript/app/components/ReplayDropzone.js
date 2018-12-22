import React from 'react';
import {CircularProgress, Typography, withStyles} from "@material-ui/core";
import Dropzone from "react-dropzone";

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

@withStyles(styles)
class ReplayDropzone extends React.Component {

    state = {
        uploading: false
    };

    handleDrop = async files => {
        const { onUploadFinished } = this.props;
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
            console.log(e);
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
                  () => (
                      <div className={classes.dropzoneRoot}>
                          <input className={classes.input}/>
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