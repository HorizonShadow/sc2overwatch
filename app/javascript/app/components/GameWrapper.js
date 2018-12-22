import React from 'react';
import Game from "./games/Game";

class GameWrapper extends React.Component {
    render() {
        const { match: { params: { gameId, playerId }}} = this.props;
        return(
          <Game gameId={gameId} playerId={playerId} />
        )
    }
}

export default GameWrapper;