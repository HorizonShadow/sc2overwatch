import React from 'react';

class Race extends React.Component {
    render() {
        const { race } = this.props;
        return(
          <img alt={race} src={`/img/races/ico_race_${race.toLowerCase()}.png`} />
        )
    }
}

export default Race;