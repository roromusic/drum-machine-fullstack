import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Interface from './Interface';

class Create extends Component {

    componentDidMount() {
        this.props.resetBeat();
    }

    componentWillUnmount() {
        if(!this.props.currentBeat._id){
            this.props.emptyBeat();
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
    resetBeat() {dispatch(actions.resetBeat())},
    emptyBeat() {dispatch(actions.emptyBeat())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));