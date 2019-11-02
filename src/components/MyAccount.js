import React, { Component } from 'react';

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username')
    }
  }

  componentDidMount() {
    if(!localStorage.getItem('username')) {
      window.location.href = '/';
    }
  }

  logOut = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  render() {
    return (
      <div>
        <div className="container" style={{marginTop: 130}}>
          <h1>My Account</h1>
          <hr />
          <h2 style={{marginTop: "10px"}}>Username: {this.state.username}</h2>
          <button onClick={this.logOut} className="btn btn-danger" style={{width: "100%", marginTop: "10px"}}>Log Out</button>
        </div>
      </div>
    );
  }
}