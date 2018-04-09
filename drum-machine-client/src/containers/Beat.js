import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Interface from './Interface';
import './Beat.css';

class Beat extends Component {
    componentDidMount() {
        this.props.getBeat(this.props.match.params.id, this.props.match.params.beat)

    }

    componentWillReceiveProps(newProps) {
        if(newProps.user && newProps.user.id === this.props.beatUserId){
            this.props.updateBeat({editable: true})
        }
    }

    componentWillUnmount() {
        this.props.emptyBeat();
    }

    render() {
        return (
            <div className='beat'>
                <Interface />
            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.user,
    beatUserId: state.currentBeat.userId._id,
    beatId: state.currentBeat._id,
    saveStatus: state.currentBeat.saveStatus
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getBeat(userId, beatId) {dispatch(actions.getBeat(userId, beatId))},
    updateBeat(newData) {dispatch(actions.updateBeat(newData))},
    emptyBeat() {dispatch(actions.emptyBeat())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Beat));