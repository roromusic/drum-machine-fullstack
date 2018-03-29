import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Header from '../components/Header';
import BeatList from '../components/BeatList';
import './Users.css';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getBeats(this.props.match.params.id);
    }
    
    componentWillReceiveProps(newProps){
        if(this.props.match.params.id !== newProps.match.params.id){
            this.props.getBeats(newProps.match.params.id);
        }
    }

    componentWillUnmount(){
        this.props.resetBeats();
    }

    render() {
        return (
            <div className="users">
                <Header
                    title={"Beats"}
                />
                <BeatList
                    beats={this.props.beats.beats}
                    displayName={this.props.beats.displayName}
                    userId={this.props.beats._id}
                />
            </div>
        )
    }
};

const mapStateToProps = state => ({
    beats: state.beats
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getBeats(userID) {dispatch(actions.getBeats(userID))},
    resetBeats() {dispatch(actions.resetBeats())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));