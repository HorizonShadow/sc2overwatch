import React from 'react';
import {
    withStyles
} from '@material-ui/core';
const styles = theme => ({
    icon: {
        paddingRight: theme.spacing.unit
    }
});

@withStyles(styles, { withTheme: true })
class Flag extends React.Component {
    render() {
        const { classes, server } = this.props;
        return(
          <img alt={server} src={`/img/flags/${server}.png`} className={classes.icon} />
        )
    }
}

export default Flag;
