import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style/login.css';
import { Helmet } from 'react-helmet'

export default class LoginWithUsername extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: [],
        disabled: "disabled"
    }
  }

  componentDidMount() {
      if(localStorage.getItem('username')) {
        window.location.href = '/';
      }
      fetch('https://simplyopensource.in:5000/users')
      .then(res => res.json())
      .then(data => {
        this.setState({users: data});
        this.setState({disabled: ""})
      })
      .catch(err => console.log(err));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    let user_id = '';
    const password = document.getElementById('password').value;
    let correct = false;
    if(username.trim().length > 3 && password.trim().length > 3) {
      this.state.users.forEach(user => {
        if(user.username === username && user.password === password) {
          correct = true;
          user_id = user._id;
        }
      });
      if(correct) {
        this.afterLogin(username, user_id);
      } else {
        this.showAlert("Please enter a valid user!")
      }
    } else {
      this.showAlert("Please enter a valid user!")
    }
  }

  afterLogin = (username, id) => {
    localStorage.setItem("username", username);
    localStorage.setItem("user_id", id);
    window.location.href = '/';
}

  showAlert = (s) => {
    document.querySelector('.myAlert').style.display = "block";
    document.querySelector('.myAlertText').innerHTML = s;
    setTimeout(() => {
        document.querySelector('.myAlert').style.display = "none"; 
    }, 5000)
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{ 'Login' }</title>
        </Helmet>
        <div className="tests_header">
            <h1>Log in</h1>
        </div>
        <div className="container" style={{marginTop: 20}}>
          <form onSubmit={this.onSubmit}>
            <h3 style={{fontFamily: 'Lucida Sans'}}>Username: </h3>
            <input disabled={this.state.disabled} id="username" type="text" className="form-control" style={{marginBottom: 15}} />
            <h3 style={{fontFamily: 'Lucida Sans'}}>Password: </h3>
            <input disabled={this.state.disabled}  id="password" type="password" className="form-control" style={{marginBottom: 15}} />
            <input disabled={this.state.disabled}  type="submit" className="btn btn-primary" style={{width: "100%"}} />
            <br /><br />
            <Link to={"/signup"} className="create_account_link">
              You dosen't have an account? Click here!
            </Link>
            <div className="myAlert">
                <h3 style={{fontFamily: 'Lucida Sans'}} className="myAlertText">Every field should have at least 4 characters!</h3>
            </div>
          </form>
        </div>
      </div>
    );
  }
}