import React, { Component } from 'react';
import './style/myAccount.css';
import {Link} from 'react-router-dom';

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username'),
      email: localStorage.getItem("email") || 'guest@guest.com',
      
      loaded: false,
      tests: [],
      testsTitles: [] 
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const cert = document.getElementById('certifications').value;
    const qualifications = document.getElementById('qualifications').value;
    const org = document.getElementById('organization').value;
    if(qualifications.trim().length > 3 && cert.trim().length > 3 && org.trim().length > 3) {
      fetch(`https://simpleosbackend.herokuapp.com/users/${this.state.username}/0/${this.state.email}/${cert}/${qualifications}/${org}`, {
        method: "POST"
    })
    .then(res => this.afterCreated())
    .catch(res => this.showAlert("Problems creating the user!"));
    } else {
        this.showAlert("Every field should have at least 4 characters!");
    }
  }

  showAlert = (s) => {
    document.querySelector('.myAlert').style.display = "block";
    document.querySelector('.myAlertText').innerHTML = s;
    setTimeout(() => {
        document.querySelector('.myAlert').style.display = "none"; 
    }, 5000)
  }
  afterCreated = () => {
    window.location.href = '/myaccount';
  }


  componentDidMount() {
    if(!localStorage.getItem('username')) {
      window.location.href = '/';
    }
    fetch(`https://simpleosbackend.herokuapp.com/users/${this.state.username}`)
    .then(res => res.json())
    .then(data => {
      if(data != null) {
        this.setState({tests: data.tests}, () => {
          this.uploadTests();
        })
      }
      this.setData(data)})
    .catch(err => console.log(err));
  }

  uploadTests = () => {
    if(this.state.tests.length > 0) {
      document.querySelector('.user_profile_2').style.display = "block";
      this.state.tests.forEach(test => {
        fetch(`https://simpleosbackend.herokuapp.com/users/title/${test}`)
        .then(res => res.json())
        .then(data => {
          let names = this.state.testsTitles;
          names.push(data.title);
          this.setState({testsTitles: names})
        })
      })
    }
  }

  logOut = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  setData = (data) => {
    this.setState({loaded: true});
    if(data != null) {
      document.querySelector(".more_info").innerHTML += `
        <h5><strong>Certifications:</strong>  ${data.certifications}</h5>
        <h5><strong>Qualifications:</strong>  ${data.qualifications}</h5>
        <h5><strong>Organization:</strong> ${data.organization}</h5>
      `;
    } else {
      document.querySelector('.user_profile_3').style.display = "block";
      document.querySelector('.user_profile_2').style.display = "none";
    }
  }

  render() {
    const output = this.state.testsTitles.map((test, i) => (
      <Link to={`/test/${this.state.tests[i]}`}>
          <div className="test">
            <h2>{test}</h2>
          </div>
      </Link>
    )) 
    return (
      <div>
        <div className="user_profile" style={{marginTop: 150}}>
          <div className="user_profile_1">
            <center><h2>User Information</h2></center>
            <hr />
            <h5 style={{marginTop: "10px"}}><strong>Username:</strong> {this.state.username}</h5>
            <div className="more_info">
            </div>
            <Link to={'/update'}>
              <button className="btn btn-info" style={{width: "100%", marginTop: "10px"}}>Update</button>
            </Link>
            <button onClick={this.logOut} className="btn btn-danger" style={{width: "100%", marginTop: "10px"}}>Log Out</button>
            <br />
            <br />
            <br />
          </div>
          <div className="user_profile_2" style={{display: "none"}}>
            <center><h2>Finished</h2></center>
            <hr />
            {output}
          </div>
          <div className="user_profile_3" style={{display: "none"}}>
            <center><h2>It looks like something is missing! Plese fill all the fields!</h2></center>
            <hr />
            <form onSubmit={this.onSubmit}>
              <h3>Certifications</h3>
              <textarea disabled={this.state.disabled} id="certifications" className="form-control" style={{marginBottom: 15}}></textarea>
              <h3>Qualifications</h3>
              <textarea disabled={this.state.disabled} id="qualifications" className="form-control" style={{marginBottom: 15}}></textarea>
              <h3>Organization</h3>
              <input disabled={this.state.disabled} id="organization" type="text" className="form-control" style={{marginBottom: 15}} />
              <div className="myAlert">
                  <h3 className="myAlertText">Every field should have at least 4 characters!</h3>
              </div>
              <input disabled={this.state.disabled} type="submit" className="btn btn-info" style={{width: "100%", marginBottom: "30px"}} />
              <div className="myAlert">
                  <h3 className="myAlertText">Every field should have at least 4 characters!</h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}