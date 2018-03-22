import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Navbar from '../components/Navbar';
import Main from './Main';

const App = ({
  user,
  handleSignIn,
  handleLogOut,
  editable,
  handleSave,
  saveStatus,
  displayResult
}) => (
  <div>
    <Navbar 
      user={user}
      onSignIn={handleSignIn}
      onLogOut={handleLogOut}
      editable={editable}
      onSave={handleSave}
      saveStatus={saveStatus}
      displayResult={displayResult}
    />
    <Main />
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
  editable: state.currentBeat.editable,
  saveStatus: state.currentBeat.saveStatus,
  displayResult: state.currentBeat.displayResult
});

const mapDispatchToProps = dispatch => ({
  handleSignIn(idToken) { dispatch(actions.signIn(idToken)) },
  handleLogOut(){ dispatch(actions.userLogout()) },
  handleSave(){ dispatch(actions.saveBeat())}
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
