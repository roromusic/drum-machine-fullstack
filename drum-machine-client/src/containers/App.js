import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import Navbar from '../components/Navbar';
import Small from '../components/Small';
import Main from './Main';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false
    }

    this.resize = this.resize.bind(this);
  }

  resize() {
    this.setState(() => ({ isMobile: window.innerWidth <= 640}))
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  render() {
    const {
      user,
      handleSignIn,
      handleLogOut,
      editable,
      handleSave,
      saveStatus,
      displayResult,
      handleCreate,
      handleDelete
    } = this.props;

    return (
      <div>
        <Navbar
          user={user}
          onSignIn={handleSignIn}
          onLogOut={handleLogOut}
          editable={editable}
          onSave={handleSave}
          onCreate={handleCreate}
          saveStatus={saveStatus}
          displayResult={displayResult}
          onDelete={handleDelete}
        />
        {
          this.state.isMobile
          ? <div>
              <Small />
            </div>
          : <Main />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  editable: state.currentBeat.editable,
  saveStatus: state.currentBeat.saveStatus,
  displayResult: state.currentBeat.displayResult
});

const mapDispatchToProps = dispatch => ({
  handleSignIn(idToken) { dispatch(actions.signIn(idToken)) },
  handleLogOut(){ dispatch(actions.userLogout()) },
  handleSave(){ dispatch(actions.saveBeat())},
  handleCreate(){ dispatch(actions.createBeat())},
  handleDelete(){ dispatch(actions.deleteBeat())}
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
