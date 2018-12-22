import React from 'react';
import { Typography } from "@material-ui/core";
import Flag from "../Flag";
import Race from "../Race";

class GamePlayerInfo extends React.Component {

    pluralize(count) {
        if(count === 1) {
            return ' person thinks'
        }
        return ' people think'
    }
    render() {
        const { game_player } = this.props;
        return(
            <React.Fragment>
                <Typography variant={'h5'} component={'h2'}>
                    <Flag server={game_player.player.server}/>
                    <Race race={game_player.race}/>
                    {game_player.player.name}
                </Typography>
                <Typography>
                    {game_player.game.map}
                </Typography>
                <Typography>
                    {game_player.game.format} {game_player.game.gameType}
                </Typography>
                <Typography gutterBottom>
                    {game_player.game.date}
                </Typography>
                <Typography variant={'caption'} color={'textSecondary'}>
                    {game_player.guiltyCount}
                    { this.pluralize(game_player.guiltyCount) } they're hacking
                </Typography>
                <Typography variant={'caption'} color={'textSecondary'}>
                    {game_player.innocentCount}
                    {this.pluralize(game_player.innocentCount)} they aren't hacking
                </Typography>
            </React.Fragment>
        )
    }
}

export default GamePlayerInfo;
