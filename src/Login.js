import React, {Component} from 'react';
import {loginWithGoogle, checkLogin} from "./auth";

class Login extends Component {
  componentWillMount() {
    checkLogin(user => {
      if (user) this.props.history.push('/');
    });
  }

  render() {
    return <div>
      <h1>Login</h1>
      <button style={{fontSize: '1em'}} onClick={loginWithGoogle}>Log in with Google</button>
    </div>
  }
}

export default Login;