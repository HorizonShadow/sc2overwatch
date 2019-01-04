import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, withApollo} from 'react-apollo';
import PlayerList from "./components/players/PlayerList";
import { Grid } from "@material-ui/core/es/index";
import {withStyles} from "@material-ui/core/es/styles/index";
import Navbar from "./components/Navbar";
import TitleBar from "./components/TitleBar";
import UploadModal from "./components/upload/UploadModal";
import GamePlayerList from "./components/game_players/GamePlayerList";
import { SnackbarProvider } from 'notistack';
import GameList from "./components/games/GameList";
import { blue, orange } from '@material-ui/core/colors';
import { graphql } from "react-apollo";
import gql from "graphql-tag";


const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: orange
    },
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2
    },
    content: {
        flex: 1,
        marginBottom: 56
    }
});

const client = new ApolloClient({
    uri: `${window.location.protocol}://${window.location.host}/graphql`,
    clientState: {
        defaults: {
            selectedNav: 0,
            uploadModalOpen: false,
            q: '',
            searchOpen: false
        }
    }
});

@withStyles(styles, { withTheme: true })
class App extends Component {

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <ApolloProvider client={client}>
                            <div className={classes.content}>
                                <TitleBar />
                                <Grid container className={classes.container} spacing={0} justify={'center'}>
                                    <Route exact path={'/players'} component={PlayerList} />
                                    <Route exact path={'/recent'} component={GamePlayerList}/>
                                    <Route exact path={'/players/:playerId/games'} component={({match: { params }}) => <GameList playerId={params.playerId} /> } />
                                    <Route exact path={'/'} component={() => (
                                        <Redirect to={'/recent'} />
                                    )} />
                                </Grid>
                                <UploadModal />
                            </div>
                            <Navbar />
                        </ApolloProvider>
                    </BrowserRouter>
                </SnackbarProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
