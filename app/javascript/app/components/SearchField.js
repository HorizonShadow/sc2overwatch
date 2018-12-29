import React from 'react';
import {InputBase, withStyles} from "@material-ui/core";
import {withApollo} from "react-apollo";

const styles = theme => ({
    root: {
        color: 'inherit',
        width: '100%',
    },
    input: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

@withApollo
@withStyles(styles, { withTheme: true })
class SearchField extends React.Component {

    changeHandle = null;

    handleChange = e => {
        const { client } = this.props;
        const query = e.target.value;
        if(this.changeHandle) {
            clearTimeout(this.changeHandle);
        }
        this.changeHandle = setTimeout(() => {
            this.changeHandle = null;
            gtag('event', 'search', {
                'event_label': query
            });
            client.writeData({
                data: {
                    q: query
                }
            });
        }, 500);

    };

    handleFocus = () => {
        const { client } = this.props;
        console.log('focused');
        client.writeData({
            data: {
                searchOpen: true
            }
        })
    };
    render() {
        const { classes } = this.props;
        return(
          <InputBase
            placeholder={'Search...'}
            classes={classes}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
        )
    }
}

export default SearchField;