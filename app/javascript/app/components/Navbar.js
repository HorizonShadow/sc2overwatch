import React from 'react';
import {BottomNavigation, BottomNavigationAction, withStyles} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import UploadReplayButton from "./UploadReplayButton";
import {graphql, withApollo} from "react-apollo";
import gql from "graphql-tag";

const styles = theme => ({
    nav: {
        position: 'fixed',
        bottom: 0,
        width: '100%'
    }
});

const GET_SELECTED_NAV = gql`
    {
        selectedNav @client
    }
`;

@withApollo
@graphql(GET_SELECTED_NAV)
class Navbar extends React.Component {
    render() {
        const { classes, client, data: { selectedNav } } = this.props;
        return(
            <React.Fragment>
                <BottomNavigation
                    value={selectedNav}
                    onChange={(e,v) => client.writeData({ data: { selectedNav: v }})}
                    showLabels
                    className={classes.nav}
                >
                    <BottomNavigationAction
                        label={"Recent"}
                        icon={<RestoreIcon />}
                        component={Link}
                        to={'/recent'}
                    />
                    <BottomNavigationAction
                        label={"Players"}
                        icon={<PeopleIcon />}
                        component={Link}
                        to={'/players'}
                    />
                </BottomNavigation>
                <UploadReplayButton />
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Navbar);
