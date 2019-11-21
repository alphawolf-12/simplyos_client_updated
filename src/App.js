import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './components/Search';
import './components/style/bootstrap.css';
import './components/style/my_style.css';
import MyAccount from './components/MyAccount';
import Home from './components/Home';
import Login from './components/Login';
import LoginWithUsername from './components/LoginWithUsername';
import Categories from './components/Categories';
import Tests from './components/Tests';
import Test from './components/Test';
import Signup from './components/Signup';
import Update from './components/Update';
import MyReviews from './components/MyReviews';
import Review from './components/Review';
import UpdateReview from './components/UpdateReview';
import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:5500/')
    .then(res => res.json())
    .then(d => alert(d))
    .catch(err => alert(err));
  }
  render() {
    return (
      <Router>
        <div className="App" style={{minHeight: "100vh", overflowX: "hidden", overflowY: "auto"}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/tests/:category_id/:category_name" exact component={Tests} />
            <Route path="/search/:text_query" exact component={Search} />
            <Route path="/test/:test_id/:test_name" exact component={Test} />
            <Route path="/myaccount" exact component={MyAccount} />
            <Route path='/user/login' exact component={LoginWithUsername} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/update" exact component={Update} />
            <Route path="/review/:post_id" exact component={Review} />
            <Route path="/reviews/:user_id" exact component={MyReviews} />
            <Route path="/reviews/update/:review_id" exact component={UpdateReview} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
