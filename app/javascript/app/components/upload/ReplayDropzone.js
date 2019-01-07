import React from 'react';
import {CircularProgress, Typography, withStyles} from "@material-ui/core";
import Dropzone from "react-dropzone";
import classNames from 'classnames';
import {withSnackbar} from "notistack";
import {withApollo} from "react-apollo";

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
@withApollo
@withStyles(styles)
class ReplayDropzone extends React.Component {

    state = {
        uploading: false
    };

    handleDrop = async files => {
        const { enqueueSnackbar, client } = this.props;
        this.setState({ uploading: true });
        const formData = new FormData();
        formData.append('file', files[0]);
        try {
            const resp = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            const json = await resp.json();
            console.log(json);
            json.players.forEach(p => {
                p.__typename = 'GamePlayer';
                p.player.__typename = 'Player';
            });
            json.__typename = 'Game';
            client.writeData({
                data: {
                    upload: {
                        __typename: 'Upload',
                        step: 1,
                        players: json.players.map(p => ({
                            __typename: 'Player',
                            id: p.players_id,
                            name: p.player.players_name,
                        })),
                        gameId: json.replay_id
                    }
                }
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
          <Dropzone onDrop={this.handleDrop} >
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