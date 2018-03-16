import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Interface from './Interface';
import Header from '../components/Header';

class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLatest();
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
    getLatest() {dispatch(actions.getLatest())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);