import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, fetchURLS } from "../actions";

const API_KEY = process.env.REACT_APP_GAPI_CLIENT_ID;

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: API_KEY,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      this.props.fetchURLS();
    } else {
      this.props.signOut();
    }
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className='ui negative basic button'>
          <i className='google icon'></i> Log Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className='ui primary basic button'>
          <i className='google icon'></i> Log In
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  fetchURLS
})(GoogleAuth);
