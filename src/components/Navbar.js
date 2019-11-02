import React, { Component } from 'react';
import './style/navbar.css';
import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';

export default class Navbar  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar_visible: false,
      isLoggedIn: localStorage.getItem('username') ? true : false,
      loggedInText: localStorage.getItem('username') ? "My Account" : 'Log In',
      loggedInPath: localStorage.getItem('username') ? '/myaccount' : '/login',
    }
  }

  componentDidMount() {
    this.checkSize();
    window.addEventListener('resize', () => {
      this.checkSize();
    })
  }

  checkSize() {
    const width = window.innerWidth;
    if(width > 550) {
      document.querySelector('.navbar_toggle').style.display = 'none';
      this.hideNavbar();
    } else {
      document.querySelector('.navbar_toggle').style.display = 'block';
      document.querySelector('.navbar_content').style.display = 'fixed';
      
    }
  }

  hideNavbar = () => {
    document.querySelector('.navbar').style.marginLeft = "0px"
    document.querySelector('.navbar_content').style.marginLeft = "-250px"
    this.setState({navbar_visible: false});
  }

  logOut = () => {
    if(this.state.isLoggedIn) {
  
    } else {
      this.hideNavbar();
    }
  }

  make_navbar_visible = () => {
    if(this.state.navbar_visible) {
      document.querySelector('.navbar_content').style.marginLeft = "-250px"
      document.querySelector('.navbar_toggle').id="no_rotate-text"
      this.setState({navbar_visible: false});
    } else {
      document.querySelector('.navbar_content').style.marginLeft = "0px"
      this.setState({navbar_visible: true});
    }
  }
  render() {
    return (
      <div>
        <div className="navbar">
          <div className="navbar_left">
            <Link to={'/'}>
              <img alt="Sorry" src={Logo} style={{width: 90, marginLeft: 5}} />
            </Link>
          </div>
          <div className="navbar_right">
            <a style={{transition: '0.5s', padding: '15px'}} id="no_rotate-text" className="navbar_toggle" onClick={this.make_navbar_visible} href="#">&#x2630;</a>
            <div className="navbar_web">
              <Link to={'/'} className="web_link">
                Home
              </Link>
              <Link to={'/categories'} className="web_link">
                Categories
              </Link>
              <Link to={this.state.loggedInPath} className="web_link" onClick={this.logOut}>
                {this.state.loggedInText}
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar_content" >
          <div className="header" style={{borderBottom: '1px solid white'}}>
            <h3 style={{fontSize: 24}}>Simplyopensource</h3>
          </div>
          <Link to={'/'}>
            Home
          </Link>
          <Link to={'/categories'}>
            Categories
          </Link>
          <Link to={this.state.loggedInPath} onClick={this.logOut}>
            {this.state.loggedInText}
          </Link>
        </div>
      </div>
    );
  }
}