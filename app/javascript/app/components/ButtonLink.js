import React from 'react';
import {Button, withStyles} from "@material-ui/core";

const styles = theme => ({
  button: {
      left: -theme.spacing.unit * 2
  }
});

@withStyles(styles, { withTheme: true })
class ButtonLink extends React.Component {
    render() {
        const { classes, children } = this.props;
        return(
          <Button {...this.props} className={classes.button}>
              {children}
          </Button>
        )
    }
}

export default ButtonLink;