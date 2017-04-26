import React from 'react';

export default class PlayerPanel extends React.Component {
    render () {
        return (
            <div><p>{this.props.color}</p>
                <p>
                    <input
                        type="checkbox"
                        name={`computer_${this.props.player}`}
                        id={`computer_${this.props.player}`}
                    />
                    <label htmlFor={`computer_${this.props.player}`}>Computer</label>
                </p>
                <p>
                    <label htmlFor={`url_${this.props.player}`}>Adres</label>
                    <input
                        type="text"
                        name={`url_${this.props.player}`}
                        id={`url_${this.props.player}`}
                    />
                </p>
                <p>
                    <label htmlFor={`params_${this.props.player}`}>Parametry</label>
                    <textarea
                        name={`params_${this.props.player}`}
                        id={`params_${this.props.player}`}
                    />
                </p>
            </div>
        )
    }
}
