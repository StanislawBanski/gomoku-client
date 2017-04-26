import React from 'react';
import Cross from './../components/cross';

export default class Board extends React.Component {

    crossClick(id, event) {
        console.log(id);
    }


    render () {
        let fields = [0,1,2,3,4,5,6,7,8,9,10];
        const crosses = fields.map(element => <Cross key={element} id={element} click={this.crossClick} />)        
        
        return (
            <div>{crosses}</div>
        )
    }
}
