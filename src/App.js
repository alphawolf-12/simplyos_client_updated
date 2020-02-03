import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import './components/style/bootstrap.css';
import './components/style/my_style.css';
import MyAccount from './components/MyAccount';
import config from './webpack.config';
import Home from './components/Home';
import Login from './components/Login';
import InsertMeta from './components/InsertMeta';
import LoginWithUsername from './components/LoginWithUsername';
import Categories from './components/Categories';
import Tests from './components/Tests';
import Test from './components/Test';
import Signup from './components/Signup';
import Update from './components/Update';
import MyReviews from './components/MyReviews';
import Review from './components/Review';
import UpdateReview from './components/UpdateReview';
import UpdateHome from './update_components/Home.update';
import UserInformation from './components/UserInformation.admin';
import UpdateTestUpdate from './update_components/UpdateTest.update';
import InsertTest from './update_components/Insert.admin'; 
import DeleteTest from './update_components/Delete.admin'; 
import './App.css';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      meta_data : {
        'title' :'simplyopensource',
        'keyword' : 'Home Page',
        'meta_info' : {
          'des':'Test',
        },
        },
      meta_load : false,
      meta_description: {},
    }

  }
  
  componentDidMount() {
    const configData = JSON.parse(config.Config);
    let serverUrl = configData.serverUrl ; 
    let path = window.location.pathname.replace('/', '');
    if (path === '') {
      path = '/';
    }
    
    fetch(serverUrl + 'getmeta?page=' + path)
    .then(res => res.json())
    .then((response) => {
      if (response.status === true && response.data.meta_info.data) {
        let description =  String.fromCharCode.apply(null, new Uint16Array(response.data.meta_info.data));
        response.data.meta_info = JSON.parse(description);
        this.setState({'meta_data':response.data});
      }
      this.setState({meta_load : true});
       
    });
  }

  render() {
    if (this.state.meta_load === false) {
      return null;
    }
    
    return (
      <Router>
        <div className="App" style={{minHeight: "100vh", overflowX: "hidden", overflowY: "auto"}}>
        <Helmet>
          <title> {this.state.meta_data.title } | simplyopensource </title>
          <meta name="description" content={this.state.meta_data.meta_info.des}/>
          <meta name="keywords" content={this.state.meta_data.keyword }/>
          
        </Helmet>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/tests/:category_id/:category_name" exact component={Tests} />
            <Route path="/search/:text_query" exact component={Search} />
            <Route path="/test/:test_id/:test_name" exact component={Test} />
            <Route path="/myaccount" exact component={MyAccount} />
            <Route path='/user/login' exact component={LoginWithUsername} />
            <Route path='/meta/insert' exact component={InsertMeta} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/update" exact component={Update} />
            <Route path="/review/:post_id" exact component={Review} />
            <Route path="/reviews/:user_id" exact component={MyReviews} />
            <Route path="/reviews/update/:review_id" exact component={UpdateReview} />
            <Route path="/admin/users" exact component={UserInformation} />
            <Route path="/admin/update" exact component={UpdateHome} />
            <Route path='/admin/update/:id' exact component={UpdateTestUpdate} />
            <Route path='/admin/insert/' exact component={InsertTest} />
            <Route path='/admin/delete/' exact component={DeleteTest} />
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
