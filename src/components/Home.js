import React, { Component } from 'react';
import './style/home.css';
import Img1 from '../images/img_1.jpg';
import { Helmet } from 'react-helmet'
import Navbar from './Navbar';

export default class Home extends Component {
  openSearch = (e) => {
    const query = document.querySelector('.form-control').value;
    if(query.length > 0 && query.replace(" ", "").length > 0) {
      window.location.href = '/search/' + query
    }
    e.preventDefault();
  }
  render() {
    return (
      <div>
      <Navbar />
      <aside id="fh5co-hero">
        <div class="flexslider">
          <ul class="slides">
            <li>
              <div class="overlay-gradient"></div>
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-md-offset-2 text-center slider-text">
                    <div class="slider-text-inner">
                      <h1>The Roots of Education are Bitter, But the Fruit is Sweet</h1>
                      
                      
                      <p><a class="btn btn-primary btn-lg" href="#">Start Learning Now!</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li style={{background: 'black'}}>
              <div class="overlay-gradient"></div>
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-md-offset-2 text-center slider-text">
                    <div class="slider-text-inner">
                      <h1>The Great Aim of Education is not Knowledge, But Action</h1>
                      <p><a class="btn btn-primary btn-lg btn-learn" href="#">Start Learning Now!</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li style={{background: "#3e3e3e3e"}}>
              <div class="overlay-gradient"></div>
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-md-offset-2 text-center slider-text">
                    <div class="slider-text-inner">
                      <h1>We Help You to Learn New Things</h1>
                      <p><a class="btn btn-primary btn-lg btn-learn" href="#">Start Learning Now!</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>		   	
            </ul>
          </div>
      </aside>
      </div>
    );
  }
}