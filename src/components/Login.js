import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import config from '../webpack.config';
import './style/login.css';
import { Helmet } from 'react-helmet'

export default class Login extends Component {
  refresh = () => {
    window.location.reload();
  }

  componentDidMount() {
    if(localStorage.getItem('username')) {
      window.location.href = '/';
    }
  }

  render() {
    const responseGoogle = (response) => {
      let configData = JSON.parse(config.Config);
      let serverUrl = configData.serverUrl;
      console.log();
      let email_id = response.Rt.Au;
      let username = email_id.substring(0, email_id.indexOf('@')); 
      localStorage.setItem("username", username);
      localStorage.getItem("email", email_id);
      fetch(serverUrl + 'user/username/' + username)
      .then(res => res.json())
      .then(data => {
        console.log("ff");
        if(data != null && data != undefined && data != []) {
          if(data._id != null && data._id != undefined) {
            localStorage.setItem('user_id', data._id);
          }
        }
        window.location.href = '/';
      })
    }
    return (
      <div>
        <div className="login_content">
        <Helmet>
          <title>{ 'Login' }</title>
        </Helmet>
         <Link to="/user/login" className="btnBlue">
           Login with your username
         </Link>
         <br />
         <Link to="/signup" className="btnRed">
           Sign Up
         </Link>
          <br />
          <GoogleLogin
            width="300px"
            clientId="230260488335-ocfsijdhr2n38ukt2tc7bigtudhea458.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            cssClass="btnFacebook"
          />
      </div>
      </div>
    );
  }
}