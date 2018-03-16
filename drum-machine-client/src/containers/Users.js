import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from '../components/Header';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header
                    title={"Beats"}
                />
            </div>
        )
    }
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Users);