import React from 'react';
import {graphql, withApollo} from "react-apollo";
import Loader from "./Loader";
import {
    MenuList,
    MenuItem,
    Paper,
    withStyles
} from '@material-ui/core';
import SEARCH_PLAYERS from '../graphql/SearchPlayers.graphql';
import {Link} from "react-router-dom";

const styles = {
    root: {
        position: 'absolute',
        width: '100%',
        float: 'right',
        zIndex: 1
    }
};

@withApollo
@withStyles(styles)
@graphql(SEARCH_PLAYERS)
class SearchResults extends React.Component {

    handleMenuItemClick = () => {
        const { client } = this.props;
        client.writeData({
            data: {
                searchOpen: false
            }
        })
    };

    render() {
        const { classes, data: { loading, searchPlayers, error } } = this.props;
        if(loading) return <Loader />;
        if(error) return "Error";
        return(
            <div className={classes.root}>
                <Paper>
                    <MenuList>
                        {
                            searchPlayers.map(c => (
                                <MenuItem
                                  component={Link}
                                  key={c.id}
                                  to={`/players/${c.id}/games`}
                                  onClick={this.handleMenuItemClick}
                                >
                                    {c.name}
                                </MenuItem>
                            ))
                        }
                        {
                            searchPlayers.length === 0 && <MenuItem>
                                No Results
                            </MenuItem>
                        }
                    </MenuList>
                </Paper>
            </div>
        )
    }
}

export default SearchResults;
