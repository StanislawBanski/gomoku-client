import React from 'react';
import PlayerPanel from './playerPanel';
import SwitchPlayer from './switchPlayer';

export default class Panel extends React.Component {
    render () {
        return (
            <div>
                <h1>Gomoku</h1>
                <PlayerPanel player="1" color="Black" />
                <SwitchPlayer />
                <PlayerPanel player="2" color="White" />
            </div>
        )
    }
}
