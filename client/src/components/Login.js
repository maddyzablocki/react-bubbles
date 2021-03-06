import React from "react";
import axios from 'axios';


class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChanges = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', this.state.credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      this.props.history.push('/protected');
    })
    .catch(err => {
      alert('Login incorrect')
    })
  };

  render() {
    return(
      <div className="form-container">
        <h1>Sign In</h1>
        <form className="login-form" onSubmit={this.login}>
          Username
          <input 
            type='text'
            name='username'
            value={this.state.credentials.username}
            onChange={this.handleChanges}
          />
          Password
          <input 
            type='text'
            name='password'
            value={this.state.credentials.password}
            onChange={this.handleChanges}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;