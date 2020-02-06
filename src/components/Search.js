import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style/search.css';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query_string: props.match.params.text_query,
      results: 0,
      tests: []
    }
  }

  componentDidMount() {
    fetch(`/api/search/${this.state.query_string}`)
    .then(res => res.json())
    .then(data => {
      this.setState({tests: data}, () => {
        document.querySelector('.container').style.display = 'block';
        document.getElementById('search_results').innerHTML = `${data.length} Results For The Word ${this.state.query_string}`
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    const output = this.state.tests.map((test, i) => (
      <Link to={'/test/' + test._id + "/" + test.title} id={i} style={{textDecoration: 'none'}}>
          <div className="test">
            <h2>{test.title}</h2>
          </div>
      </Link>
    ))
    return (
      <div>
        <div className="tests_header" style={{margin: 0}}>
            <h1 id="search_results" style={{fontFamily: 'Comic Sans MS'}}>Loading</h1>
          </div>
        <div style={{background: 'white', marginTop: 0, fontFamily: 'Comic Sans MS', width: "80vw", margin: "auto"}}>
          <Helmet>
            <title>{ 'Search' }</title>
          </Helmet>
          <div className="container" style={{display: 'none', marginTop: 0, background: 'white', width: "100%"}}>
            <br />
            {output}
            <br />
          </div>
        </div>
      </div>
    );
  }
}