import React from 'react';
import {
    CircularProgress,
    Button,
    withStyles
} from '@material-ui/core';

const styles = theme => ({
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        position: 'relative',
        maring: theme.spacing.unit
    }
});

@withStyles(styles, { withTheme: true })
class SubmitButton extends React.Component {
    render() {
        const { loading, disabled, classes, onClick } = this.props;
        return(
          <div className={classes.wrapper}>
              <Button disabled={loading || disabled} type={'button'} onClick={onClick} >
                  Submit
              </Button>
              {
                  loading && <CircularProgress className={classes.loader} size={24} />
              }
          </div>
        )
    }
}

export default SubmitButton;