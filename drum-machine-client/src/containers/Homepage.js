import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Interface from './Interface';
import Header from '../components/Header';
import './Homepage.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLatest();
    }

    componentWillUnmount() {
        this.props.emptyBeat();
    }

    render() {

        return (
            <div className="homepage">
                <Header
                    title={"Latest Beat"}
                />
                <Interface />
            </div>
        )
    }
};

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getLatest() {dispatch(actions.getLatest())},
    emptyBeat() {dispatch(actions.emptyBeat())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);