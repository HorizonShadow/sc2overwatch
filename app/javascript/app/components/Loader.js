import React from 'react';
import {
    LinearProgress, withStyles
} from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1
    }
};

@withStyles(styles)
class Loader extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <LinearProgress variant={'indeterminate'} />
            </div>
        )
    }
}

export default Loader;
