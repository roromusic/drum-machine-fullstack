import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Navbar from '../components/Navbar';

const App = ({
  user,
  handleSignIn,
  handleLogOut
}) => (
  <Navbar 
    user={user}
    onSignIn={handleSignIn}
    onLogOut={handleLogOut}
  />
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleSignIn(idToken) { dispatch(actions.signIn(idToken)) },
  handleLogOut(){ dispatch(actions.userLogout()) },
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
