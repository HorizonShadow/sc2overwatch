import React from 'react';
import { graphql } from 'react-apollo';
import {
    Grid,
    Paper,
    withStyles
} from '@material-ui/core';
import Typography from "@material-ui/core/es/Typography/Typography";
import gql from "graphql-tag";

const GET_GAME = gql`    
    query GET_GAME($playerId: ID!, $gameId: ID!) {
        gamePlayer(playerId: $playerId, gameId: $gameId) {
            id
        }
    }
`;
const styles = (theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: 530
    }
});

@withStyles(styles, { withTheme: true })
@graphql(GET_GAME)
class Game extends React.Component {
    render() {
        const { classes, data: { loading, error, gamePlayer }} = this.props;
        if(loading) return loading;
        if(error) return error;

        return(
          <Grid item>
              <Paper className={classes.root}>
                  <Typography variant={'title'} variant="h5" component="h3">{gamePlayer.player.name}</Typography>
              </Paper>
          </Grid>
        )
    }
}

export default Game;
