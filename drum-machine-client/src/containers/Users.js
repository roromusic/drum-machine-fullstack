import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
            </div>
        )
    }
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Users);