import React, { Component } from 'react';
import "./style/categories.css";
import {Link} from 'react-router-dom';
import Navbar from './Navbar'
import { Helmet } from 'react-helmet';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    fetch('https://simplyopensource.in:5000/categories')
    .then(res => res.json())
    .then(data => {
      this.setState({categories: data})
      this.setState({tests: data});
      document.getElementById('info').style.display = "none";
    })
    .catch(err => alert('Error Occured!'));
  }
  
  render() {
    const output = this.state.categories.map((category, i) => (
      <Link to={'/tests/' + category._id + '/' + category.name} id={i}>
        <div className="category">
          <h2 style={{fontFamily: 'Lucida Sans'}}>{category.name}</h2>
        </div>
      </Link>
    ))
    return (
      <div className="categories_list">
        <Navbar />
        <Helmet>
          <title>{ 'Categories' }</title>
        </Helmet>
        <div className="tests_header">
            <h1>Categories</h1>
          </div>
        <div className="container">
          <br />
          <div className="categories_grid">
            {output}
          </div>
          <div id="info" className="myAlert" style={{display: "block", background: "darkgreen"}}>
            Loading...
          </div>
        </div>
      </div>
    );
  }
}