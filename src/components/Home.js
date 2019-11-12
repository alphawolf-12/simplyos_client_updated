import React, { Component } from 'react';
import './style/home.css';
import star from '../images/star.ico';
import test from '../images/test.png'
import Navbar from './Navbar';

export default class Home extends Component {
  openSearch = (e) => {
    const query = document.querySelector('.form-control').value;
    if(query.length > 0 && query.replace(" ", "").length > 0) {
      window.location.href = '/search/' + query
    }
    e.preventDefault();
  }
  componentDidMount() {
    setTimeout(() => {
      try {
        document.querySelector('.heading_1').style.display = 'none';
        document.querySelector('.heading_2').style.display = 'block';
      } catch(e) {

      }
    }, 6000)
    setTimeout(() => {
      try {
        document.querySelector('.heading_1').style.opacity = '0';
      } catch(e) {

      }
    }, 5000);
    setTimeout(() => {
      try {
        document.querySelector('.heading_2').style.display = 'none';
        document.querySelector('.heading_3').style.display = 'block';
      } catch(e) {

      }
    }, 12000)
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className='my_slideshow'>
          <h1 className="heading_1">The Roots of Education are Bitter, But the Fruit is Sweet!</h1>
          <h1 className="heading_2" style={{display: 'none'}}>The Great Aim of Education is not Knowledge, But Action!</h1>
          <h1 className="heading_3" style={{display: 'none'}}>We Help You to Learn New Things, search your test down here!</h1>
          <form onSubmit={this.openSearch}>
            <input className="form-control" />
          </form>
        </div>
        <br />
        <div className="section-b" >
          <div className="box a">
              <img width="100px" height="100px" src={test} style={{margin: 30}} />
              <h3 style={{padding: 20}}>Everybody is a genius. Try yourself by doing one of our tests.</h3>
          </div>
          <div className="box">
              <img width="100px" height="100px" src={star} style={{margin: 30}} />
              <h3 style={{padding: 20}}>At the end of each test you can give your review by clicking the star icon.</h3>
          </div>
      </div>
      <br />
      </div>
    );
  }
}