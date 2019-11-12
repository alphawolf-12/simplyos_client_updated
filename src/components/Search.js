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
    fetch(`https://simpleosbackend.herokuapp.com/search/${this.state.query_string}`)
    .then(res => res.json())
    .then(data => {
      this.setState({tests: data}, () => {
        document.querySelector('.container').style.display = 'block';
        document.getElementById('lodaing_search').style.display = 'none';
        document.getElementById('search_results').innerHTML = `Results: ${data.length}`
      })
    })
    .catch(err => console.log(err));
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
      <div style={{background: 'white', marginTop: 0, fontFamily: 'Comic Sans MS', width: "80vw", margin: "auto"}}>
        <Helmet>
          <title>{ 'Search' }</title>
        </Helmet>
        <div id="lodaing_search" className="alert" style={{position: 'inherit', width: "80vw", margin: 'auto'}}>
          Loading...
        </div>
        <div className="container" style={{display: 'none', marginTop: 0, background: 'white', width: "100%"}}>
          <h1 id="search_results" style={{color: 'black'}}>Results: 0</h1>
          <br />
          {output}
          <br />
        </div>
      </div>
    );
  }
}