import React from 'react';
import {graphql, withApollo} from "react-apollo";
import {
    Grid,
    Typography,
    CardActions,
    CardContent,
    CardActionArea
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Flag from "../Flag";
import ListCard from "../ListCard";
import BnetLink from "../BnetLink";
import {Link} from "react-router-dom";
import Loader from "../Loader";
import GET_PLAYERS from '../../graphql/GetPlayers.graphql';

const styles = theme => ({
    item: {
        padding: theme.spacing.unit * 2,
    }
});


@withApollo
@graphql(GET_PLAYERS)
@withStyles(styles, {withTheme: true})
class PlayerList extends React.Component {

    componentWillMount() {
        const { client } = this.props;
        client.writeData({ data: { selectedNav: 1 }});
        window.gtag('event', 'screen_view', {
            'screen_name': 'Player List'
        });
    }

    render() {
        const { data: {loading, error, players }} = this.props;
        if (loading) return <Loader />;
        if (error) return 'error';
        return (
          <React.Fragment>
            {
                players.map(c => {
                    const lastReported = c.gamePlayers[0].updatedAt;
                    const numAccused = c.gamePlayers.reduce((s, m) => s + (m.guiltyCount || 0), 0);
                    return(
                      <Grid item key={c.id}>
                        <ListCard>
                            <CardActionArea component={Link} to={`/players/${c.id}/games`}>
                                <CardContent>
                                    <Typography component={'h2'} variant={'h5'}>
                                        <Flag server={c.server}/>
                                        {c.name}
                                    <Typography/>
                                    </Typography>
                                    <Typography color={'textSecondary'}>
                                        Last Report: {lastReported}
                                    </Typography>
                                    <Typography color={'textSecondary'}>
                                        Reported {numAccused} times
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <BnetLink url={c.bnetUrl} text={'Battle.net Profile'}/>
                            </CardActions>
                        </ListCard>
                      </Grid>
                    )
                })
            }
          </React.Fragment>
        )
    }
}

export default PlayerList;
