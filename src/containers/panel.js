import React from 'react';
import PlayerPanel from './playerPanel';
import SwitchPlayer from './switchPlayer';

export default class Panel extends React.Component {
    render () {
        return (
            <div>
                <PlayerPanel player="1" color="Black" />
                <SwitchPlayer />
                <PlayerPanel player="2" color="White" />
            </div>
        )
    }
}
