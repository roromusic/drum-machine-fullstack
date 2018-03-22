import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Homepage from './Homepage';
import Users from './Users';
import Beat from './Beat';

const Main = () => (
    <div className="container">
        <Switch>
            <Route exact path="/" render={() => (
                <Homepage />
            )} />
            <Route exact path="/users/:id" render={() => (
                <Users />
            )} />
            <Route exact path="/users/:id/:beat" render={() => (
                <Beat />
            )} />
        </Switch>
    </div>
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));