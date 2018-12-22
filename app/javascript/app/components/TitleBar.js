import React from 'react';
import {AppBar, Typography, Toolbar, withStyles} from '@material-ui/core';
import SearchBox from "./SearchBox";

const styles = theme => ({
    grow: {
        flexGrow: 1
    }
});

@withStyles(styles)
class TitleBar extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <AppBar
                position={'static'}
            >
                <Toolbar>
                    <Typography variant={'h6'} color={'inherit'}>
                        Starcraft II Overwatch
                    </Typography>
                    <div className={classes.grow} />
                    <SearchBox />
                </Toolbar>
            </AppBar>
        )
    }
}

export default TitleBar;
