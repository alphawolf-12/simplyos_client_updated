import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import {Link} from 'react-router-dom';
import './style/login.css';

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
    const responseFacebook = (response) => {
      if(response.name) {
        localStorage.setItem("username", response.name);
        window.location.href = "/";
      } else {

      }
    }
    const responseGoogle = (response) => {
      console.log(response);
      localStorage.setItem("username", response.w3.ig);
      window.location.href = "/";
    }
    return (
      <div className="login_content">
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
    );
  }
}