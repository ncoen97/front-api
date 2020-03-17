import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import {userPostFetch} from '../actions';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    signupSuccessfull: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    const signupPromise = this.props.userPostFetch(this.state)
    signupPromise.then(this.setState(prevState => {
      return {
        username: prevState.username,
        password: prevState.password,
        redirect: prevState.redirect,
        signupSuccessfull: true
      }
    }))
  } 
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>

          <label>Username</label>
          <input
            name='username'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleChange}
            /><br/>

          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            /><br/>
            
          <input type='submit'/>
        </form>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Volver</button>
        <h2>{this.state.signupSuccessfull ? "Usuario creado" : ""}</h2>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);