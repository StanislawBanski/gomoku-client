import React from 'react';
import { connect } from 'react-redux';
import { switchPreview } from './../redux/settings';

class PreviewSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.previewHandler = this.previewHandler.bind(this);
    }

    previewHandler(event) {
        this.props.previewChange(event.target.checked);
    }

    render() {
        if (!this.props.onlyAi) {
            return (<p></p>);
        }
        return (
            <p>
                <input
                    type="checkbox"
                    name="preview"
                    id="preview"
                    checked={this.props.preview}
                    onChange={this.previewHandler}
                />
                <label htmlFor="preview">Podgląd</label>
            </p>
        )
    }
}

const mapStateToProps = ({ settings }) => {
    return {
        preview: settings.preview,
        onlyAi: settings[1].computer && settings[2].computer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        previewChange(value) {
            dispatch(switchPreview(value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSwitch);



