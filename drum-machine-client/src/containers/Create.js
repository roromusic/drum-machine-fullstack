import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Interface from './Interface';

class Create extends Component {

    componentDidMount() {
        this.props.resetBeat();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.currentBeat._id){
            this.props.history.push('/users/' + newProps.currentBeat.userId._id + '/' + newProps.currentBeat._id)
        }
    }

    render() {

        return (
            <div className="homepage">
                <Interface />
            </div>
        )
    }
};

const mapStateToProps = state => ({
    currentBeat: state.currentBeat
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    resetBeat() {dispatch(actions.resetBeat())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));