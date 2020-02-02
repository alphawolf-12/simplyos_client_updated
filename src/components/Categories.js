import React, { Component } from 'react';
import "./style/categories.css";
import {Link} from 'react-router-dom';
import config from '../webpack.config';
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
    let configData = JSON.parse(config.Config);
    let serverUrl = configData.serverUrl ; 
    fetch(serverUrl + 'categories')
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
        <div className="category" itemScope>
          <h2 style={{fontFamily: 'Lucida Sans'}} itemProp="name">{category.name}</h2>
        </div>
      </Link>
    ))
    return (
      <div className="categories_list">
        <Navbar />
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