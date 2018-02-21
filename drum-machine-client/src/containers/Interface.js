import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Title from '../components/Title';
import Controls from '../components/Controls';

class Interface extends Component {
    constructor(props) {
        super(props);
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
                <Controls />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);