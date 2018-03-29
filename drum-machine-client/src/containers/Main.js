import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import Homepage from './Homepage';
import Users from './Users';
import Beat from './Beat';
import Create from './Create';

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
            <Route exact path="/create" render={() => (
                <Create />
            )} />
        </Switch>
    </div>
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));