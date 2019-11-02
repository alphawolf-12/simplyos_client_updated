import React, { Component } from 'react';
import "./style/categories.css";
import {Link} from 'react-router-dom';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    fetch('https://simpleosbackend.herokuapp.com/categories')
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
      <Link to={'/tests/' + category._id} id={i}>
        <div className="category">
          <h2>{category.name}</h2>
        </div>
      </Link>
    ))
    return (
      <div className="categories_list">
        <div className="container" style={{marginTop: '15px'}}>
        <br /><br />
          <h1>Categories</h1>
          <br />
          {output}
          <div id="info" className="myAlert" style={{display: "block", background: "darkgreen"}}>
            Loading...
          </div>
        </div>
      </div>
    );
  }
}