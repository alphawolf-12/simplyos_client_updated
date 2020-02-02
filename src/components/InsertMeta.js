import React, { Component } from 'react';
import config from '../webpack.config';
import { authHeader } from '../helper/auth-header';
import Access from '../AccessDenied';
import { HeaderLayout } from '../layout/layout'

class InserMeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: 'New Page',
      pages: ['New Page'],
      title: '',
      keyword : '',
      description : '',
      newPage : true,
      buttonText : 'Save',
      access : true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonHandle = this.buttonHandle.bind(this);
    
  }

  componentDidMount() {
    const configData = JSON.parse(config.Config);
    let serverUrl = configData.serverUrl ; 
    
    if (!localStorage.getItem('username')) {
      //window.location.href = '/user/login';
      this.setState({authorization:''});
      this.setState({'access':false});
    }
    this.setState({authorization:authHeader()});
    fetch(serverUrl + 'getpages')
    .then((res) => res.json())
    .then((response) => {
      this.setState({pages:response.data});
    });
    //if (this.state.)
    console.log(this.state);
  }

  handleChange(event) {
    console.log("f");
    const configData = JSON.parse(config.Config);
    let serverUrl = configData.serverUrl ; 

    const target = event.target;
    console.log(event.target.name);
    if (event.target.name === 'path') {
      if ( event.target.value === "New Page") {
        this.setState({'newPage':true});
      }
      else {
        fetch(serverUrl + 'getmeta?page=' + event.target.value)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === true && response.data.meta_info.data) {
            let description =  JSON.parse(String.fromCharCode.apply(null, new Uint16Array(response.data.meta_info.data)));
            this.setState({
              'path' : response.data.page_path,
              'title' : response.data.title,
              'keyword' : response.data.keyword,
              'description' : description.des
            });
          }
        });
        
      }
    }
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  buttonHandle = () => {
    this.setState({'newPage':false});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const configData = JSON.parse(config.Config);
    let serverUrl = configData.serverUrl ; 
    const postData = {
      'page_path' : this.state.path,
      'title' : this.state.title,
      'keyword' :  this.state.keyword,
      'meta_info' : JSON.stringify({'des': this.state.description})
    };
    this.setState({buttonText:'Saving...'})
    fetch(serverUrl + 'postmeta',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : this.state.authorization
      },
      body: JSON.stringify(postData),
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({buttonText:'Save'})
    });
  }

  render() {
    if (!this.state.authorization || this.state.access === false) {
      return (
        <Access/>
      );
    }
    else {
      let options = this.state.pages;
      let pagePathElement, button;
      //options.push('New Page');
      if (options.indexOf("New Page") === -1) options.unshift("New Page");
      const listItems = options.map((list, i)  => {
        return <option key={i} value={list}>{list}</option>
      });
      
      if (this.state.newPage) {
        pagePathElement =  <input type="text" name="path" required="required" className="metapath form-control" value={this.state.path} onChange={this.handleChange} ></input>
        button = <button onClick={this.buttonHandle}>BackList</button>;
      }
      else {
        pagePathElement = <select name="path" className="form-control" required value={this.state.path} onChange={this.handleChange}>' + 
        {listItems}</select>;
      }
      return (
        <div>
          <HeaderLayout title="MetaInfo Page"/>
      <div className="container">
      <form method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Page Path</label>
          {pagePathElement}
          {button}
        </div>
        <div className="form-group">  
          <label>Page Title</label>
          <input type="text"   name="title" required="required" className="metaTitle form-control " value={this.state.title} onChange={this.handleChange} ></input>
        </div>
        <div className="form-group">  
          <label>Keyword</label>
          <input type="text"  name="keyword"  required="required" className="metaKeyword form-control" value={this.state.keyword} onChange={this.handleChange} ></input>
        </div> 
        <div className="form-group">   
          <label>Page Description </label>
          <textarea name="description" required="required" className="metaDescription form-control" value={this.state.description} onChange={this.handleChange} ></textarea>
        </div>  
        <button type="submit" className="btn btn-primary">{this.state.buttonText}</button>
        </form>
      </div>
        </div>
       
      )
    }
    
  }

}

export default InserMeta;
