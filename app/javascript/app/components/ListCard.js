import React from 'react';
import {
    Card,
    withStyles
} from '@material-ui/core';

const styles = theme => ({
    root: {
        maxWidth: 540,
        margin: theme.spacing.unit * 2
    }
});

@withStyles(styles, { withTheme: true })
class ListCard extends React.Component {
    render() {
        const { classes, children } = this.props;
        return(
          <Card classes={classes}>
              {children}
          </Card>
        )
    }
}

export default ListCard;