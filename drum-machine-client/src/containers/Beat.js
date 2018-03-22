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
            this.props.updateBeat({editable: true, saveStatus: 'NONE'})
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.user && newProps.user.id === newProps.beatUserId){
            this.props.updateBeat({editable: true, saveStatus: 'NONE'})
        }
        
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
    beatUserId: state.currentBeat.userId._id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getBeat(userId, beatId) {dispatch(actions.getBeat(userId, beatId))},
    updateBeat(newData) {dispatch(actions.updateBeat(newData))}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Beat));