import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Homepage from './Homepage';
import Users from './Users';

const Main = () => (
    <div className="container">
        <Switch>
            <Route exact path="/" render={() => (
                <Homepage />
            )} />
            <Route exact path="/users/:id" render={() => (
                <Users />
            )} />
        </Switch>
    </div>
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));