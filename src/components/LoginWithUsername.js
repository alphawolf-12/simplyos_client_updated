import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../webpack.config';
import './style/login.css';
import { Helmet } from 'react-helmet'

export default class LoginWithUsername extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: [],
       
    }
  }

  componentDidMount() {
      if(localStorage.getItem('username')) {
        window.location.href = '/';
      }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let configData = JSON.parse(config.Config);
    let serverUrl = configData.serverUrl ; 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    var data = new FormData();
    const datael = {
      "username": username,
      "pass": password
    }

    data.append("jsonData", JSON.stringify(datael));

    fetch(serverUrl + 'user/validate',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datael),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.login === true) {
        this.afterLogin(data.data_info.username, data.data_info.id);
      }
      else {
        this.showAlert("Please enter a valid user!")
      }
      //
    })
    .catch((error) => {
      console.error('Error:', error);
  });
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
            <input disabled={this.state.disabled} required id="username" type="text" className="form-control" style={{marginBottom: 15}} />
            <h3 style={{fontFamily: 'Lucida Sans'}}>Password: </h3>
            <input disabled={this.state.disabled}  required id="password" type="password" className="form-control" style={{marginBottom: 15}} />
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