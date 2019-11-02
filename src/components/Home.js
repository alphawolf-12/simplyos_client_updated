import React, { Component } from 'react';
import './style/home.css';
import Img1 from '../images/img_1.jpg';

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
      <div className="home_content">
        <div className="container_2">
          <img alt="Img" src={Img1} style={{width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center"}} />
        </div>
        <div className="container_1">
          <div className="search_content">
            <h4 style={{color: "#fff"}}>Search your test</h4>
            <form onSubmit={this.openSearch}>
              <input className="form-control" type="text"
                aria-label="Search" style={{background: 'transparent', color: 'white', border: '1px solid white'}} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}