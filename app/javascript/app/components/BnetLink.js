import React from 'react';
import {OpenInNew} from "@material-ui/icons";
import {Button, withStyles } from "@material-ui/core";

const styles = theme => ({
    icon: {
       marginLeft: theme.spacing.unit
    }
});

@withStyles(styles, { withTheme: true })
class BnetLink extends React.Component {
    render() {
        const { url, text, classes } = this.props;
        return(
          <Button component={'a'} href={url}>
              {text}
              <OpenInNew className={classes.icon}/>
          </Button>
        )
    }
}

export default BnetLink;