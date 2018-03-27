import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Interface from './Interface';
import './Beat.css';

class Beat extends Component {
    componentDidMount() {
        this.props.getBeat(this.props.match.params.id, this.props.match.params.beat)

        if(this.props.user && this.props.user.id === this.props.beatUserId){
            this.props.updateBeat({editable: true})
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.user && newProps.user.id === newProps.beatUserId){
            this.props.updateBeat({editable: true})
        }
        if(!newProps.beatId){
            this.props.history.push('/users/' + this.props.user.id);
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
    beatId: state.currentBeat._id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getBeat(userId, beatId) {dispatch(actions.getBeat(userId, beatId))},
    updateBeat(newData) {dispatch(actions.updateBeat(newData))},
    emptyBeat() {dispatch(actions.emptyBeat())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Beat));