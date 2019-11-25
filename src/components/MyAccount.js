import React, { Component } from 'react';
import './style/myAccount.css';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';

export default class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username'),
      email: localStorage.getItem("email") || 'guest@guest.com',
      
      loaded: false,
      tests: [],
      testsTitles: [] ,
      testsIds: []
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const cert = document.getElementById('certifications').value;
    const qualifications = document.getElementById('qualifications').value;
    const org = document.getElementById('organization').value;
    if(qualifications.trim().length > 3 && cert.trim().length > 3 && org.trim().length > 3) {
      fetch(`https://simplyopensource.in:5000/users/${this.state.username}/0/${this.state.email}/${cert}/${qualifications}/${org}`, {
        method: "POST"
    })
    .then(res => res.json())
    .then(data => this.afterCreated(data))
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
  afterCreated = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('user_id', data._id);
    window.location.href = '/myaccount';
  }


  componentDidMount() {
    if(!localStorage.getItem('username')) {
      window.location.href = '/';
    }
    if(localStorage.getItem('username')) {
      fetch(`https://simplyopensource.in:5000/user/username/${localStorage.getItem('username')}`)
      .then(res => res.json())
      .then(data => {
        if(data != null && data.tests != undefined && data != []) {
          this.setState({tests: data.tests}, () => {
            this.uploadTests();
          })
        } else {
          document.querySelector('.user_profile_3').style.display = 'block';
        }
        this.setData(data)})
      .catch(err => console.log(err));
    } else {
      document.querySelector('.user_profile_3').style.display = 'block';
    }
  }

  uploadTests = () => {
    if(this.state.tests.length > 0) {
      document.querySelector('.user_profile_2').style.display = "block";
      this.state.tests.forEach(test => {
        fetch(`https://simplyopensource.in:5000/users/title/${test}`)
        .then(res => res.json())
        .then(data => {
          let names = this.state.testsTitles;
          let testsIds = this.state.testsIds;
          names.push(data.title);
          testsIds.push(data.id);
          this.setState({testsTitles: names, testsIds: testsIds})
        })
      })
    }
  }

  logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
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
      <Link to={`/test/${this.state.testsIds[i]}/${test}`}>
          <div className="test">
            <h2>{test}</h2>
          </div>
      </Link>
    )) 
    return (
      <div>
        <Navbar />
        <Helmet>
          <title>{ 'My Account' }</title>
        </Helmet>
        <div className="tests_header">
            <h1>{this.state.username}</h1>
          </div>
        <div className="user_profile" style={{marginTop: 20}}>
          <div className="user_profile_1">
            <center><h2 style={{color: 'black', fontFamily: 'Lucida Sans'}}>User Information</h2></center>
            <hr />
            <div className="more_info">
            </div>
            <Link to={'/update'} className="update_links">
              <button className="btn btn-primary" style={{border: '0px',width: "100%", marginTop: "10px", background: "#107dac"}}>Update</button>
            </Link>
            <Link to={'/reviews/' + localStorage.getItem('user_id')}>
              <button className="btn btn-primary" style={{border: '0px',width: "100%", marginTop: "10px", color: 'white', background: "#107dac"}}>Check my reviews</button>
            </Link>
            <button onClick={this.logOut} className="btn btn-primary" style={{border: '0px',width: "100%", marginTop: "10px", background: "#005073"}}>Log Out</button>
            <br />
            <br />
            <br />
          </div>
          <div className="user_profile_2" style={{display: "none"}}>
            <center><h2 style={{color: 'black'}}>Finished</h2></center>
            <hr />
            {output}
          </div>
          <div className="user_profile_3" style={{display: "none"}}>
            <center><h2  style={{color: 'black', fontFamily: "Lucidd Sans"}}>It looks like something is missing! Plese fill all the fields!</h2></center>
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
                  <h3 className="myAlertText" >Every field should have at least 4 characters!</h3>
              </div>
            </form>
          </div>
        </div>
        <br />
      </div>
    );
  }
}