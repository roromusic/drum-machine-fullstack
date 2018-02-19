import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
            </div>
        )
    }
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);