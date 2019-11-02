import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style/tests.css';

export default class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: props.match.params.category_id,
      tests: []
    }
  }

  componentDidMount() {
    fetch(`https://simpleosbackend.herokuapp.com/tests/category/${this.state.category_id}`)
    .then(res => res.json())
    .then(data => {
      if(data.length === 0) {
        document.getElementById('info').classList = "alert alert-danger";
        document.getElementById('info').innerHTML = "No tests for this category!";
      } else {
        this.setState({tests: data});
        document.getElementById('info').style.display = "none";
      }
    })
    .catch(err => alert('Error Occured!'));
  }
  render() {
    const output = this.state.tests.map((test, i) => (
      <Link to={'/test/' + test._id} id={i}>
          <div className="test">
            <h2>{test.title}</h2>
          </div>
      </Link>
    ))
    return (
      <div>
        <br /><br />
        <div className="categories_list">
          <div className="container">
            <h1>Tests</h1>
            <br />
            {output}
            <div id="info" className="myAlert" style={{display: "block", background: "darkgreen"}}>
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }
}