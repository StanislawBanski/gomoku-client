import React from 'react';
import { connect } from 'react-redux';

class Status extends React.Component {
    render () {
        return (
            <div>
                {this.props.win === null
                ? <button>Start game</button>
                : <p>Win: {this.props.win ? 'white' : 'black'}</p>}                
            </div>
        )
    }
}

const mapStateToProps = ({status}) => {
    return {
        win: status.win
    }
}

export default connect(mapStateToProps)(Status);

