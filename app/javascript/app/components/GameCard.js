import React from 'react';
import ListCard from "./ListCard";
import {Button, CardActionArea, CardActions, Grid} from "@material-ui/core";
import GamePlayerExpansion from "./game_players/GamePlayerExpansion";
import {Link} from "react-router-dom";
import BnetLink from "./BnetLink";

class GameCard extends React.Component {
    render() {
        const { game_player, player } = this.props;
        return(
            <Grid item>
                <ListCard>
                    <CardActionArea component={'div'}>
                        <GamePlayerExpansion game_player={game_player} />
                    </CardActionArea>
                    <CardActions>
                        <Button component={Link} to={`/players/${player.id}/games`}>
                            All Games
                        </Button>
                        <BnetLink url={player.bnetUrl} text={'Battle.net Profile'}/>
                    </CardActions>
                </ListCard>
            </Grid>
        )
    }
}

export default GameCard;
