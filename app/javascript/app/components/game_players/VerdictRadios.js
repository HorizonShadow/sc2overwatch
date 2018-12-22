import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, withStyles} from "@material-ui/core";


const styles = theme => ({
    formControl: {
        marginTop: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

@withStyles(styles, { withTheme: true })
class VerdictRadios extends React.Component {
    render() {
        const { onChange, value, classes } = this.props;
        return(
          <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">What do you think?</FormLabel>
              <RadioGroup
                aria-label="verdict"
                name="verdict"
                className={classes.group}
                value={value}
                onChange={onChange}
              >
                  <FormControlLabel value="guilty" control={<Radio />} label="Guilty" />
                  <FormControlLabel value="innocent" control={<Radio />} label="Innocent" />
              </RadioGroup>
          </FormControl>
        )
    }
}

export default VerdictRadios;