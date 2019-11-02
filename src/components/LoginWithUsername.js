import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style/login.css';

export default class LoginWithUsername extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: []
    }
  }

  componentDidMount() {
      if(localStorage.getItem('username')) {
        window.location.href = '/';
      }
      fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        this.setState({users: data})
      })
      .catch(err => console.log(err));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let correct = false;
    if(username.trim().length > 3 && password.trim().length > 3) {
      this.state.users.map(user => {
        if(user.username === username && user.password === password) {
          correct = true;
        }
      });
      if(correct) {
        this.afterLogin(username);
      } else {
        this.showAlert("Please enter a valid user!")
      }
    } else {
      this.showAlert("Please enter a valid user!")
    }
  }

  afterLogin = (username) => {
    localStorage.setItem("username", username);
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
      <div style={{marginTop: 150}}>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <center><h1>Log In</h1></center>
            <h3>Username: </h3>
            <input id="username" type="text" className="form-control" style={{marginBottom: 15}} />
            <h3>Password: </h3>
            <input id="password" type="password" className="form-control" style={{marginBottom: 15}} />
            <input type="submit" className="btn btn-info" style={{width: "100%"}} />
            <br /><br />
            <Link to={"/signup"} className="create_account_link">
              You dosen't have an account? Click here!
            </Link>
            <div className="myAlert">
                <h3 className="myAlertText">Every field should have at least 4 characters!</h3>
            </div>
          </form>
        </div>
      </div>
    );
  }
}