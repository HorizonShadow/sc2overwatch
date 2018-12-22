import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, ClickAwayListener } from "@material-ui/core";
import {fade} from "@material-ui/core/styles/colorManipulator";
import { withApollo } from "react-apollo";
import SearchResultsWrapper from "../SearchResultsWrapper";
import SearchField from "./SearchField";

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

@withApollo
@withStyles(styles)
class SearchBox extends React.Component {
    handleClickAway = () => {
        const { client } = this.props;
        client.writeData({
            data: {
                searchOpen: false
            }
        })
    };

    render() {
        const { classes } = this.props;
        return(
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className={classes.search} >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <SearchField />
                        <SearchResultsWrapper />
                </div>
            </ClickAwayListener>

        )
    }
}

export default SearchBox;
