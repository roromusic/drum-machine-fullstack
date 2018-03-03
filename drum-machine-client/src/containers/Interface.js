import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Title from '../components/Title';
import Controls from '../components/Controls';

const files = [
    ["cowbell", "https://freesound.org/data/previews/34/34272_304419-lq.mp3"],
    ["kick", "https://freesound.org/data/previews/132/132584_2409787-lq.mp3"],
    ["snare", "https://freesound.org/data/previews/13/13750_32468-lq.mp3"],
    ["hi-hat", "https://freesound.org/data/previews/140/140514_177850-lq.mp3"],
    ["crash", "https://freesound.org/data/previews/13/13244_36719-lq.mp3"]
]

class Interface extends Component {
    constructor(props) {
        super(props);
    }

    updateBeat(newData){
        this.props.updateBeat(newData);
    }

    render() {
        const {
            title,
            bpm,
            pattern,
            displayName,
            id,
            editable
        } = this.props;

        return (
            <div>
                <Title
                    title={title}
                    displayName={displayName}
                    id={id}
                    editable={editable}
                />
                <Controls 
                    updateBeat={this.props.updateBeat}
                    bpm={bpm}
                />
            </div>
        )
    }
};

const mapStateToProps = state => ({
    title: state.currentBeat.title,
    bpm: state.currentBeat.bpm,
    pattern: state.currentBeat.pattern,
    displayName: state.currentBeat.userId.displayName,
    id: state.currentBeat.userId._id,
    editable: state.currentBeat.editable
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateBeat(newData) {dispatch(actions.updateBeat(newData))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);