import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './components/Search';
import MyAccount from './components/MyAccount';
import Home from './components/Home';
import Login from './components/Login';
import LoginWithUsername from './components/LoginWithUsername';
import Categories from './components/Categories';
import Tests from './components/Tests';
import Test from './components/Test';
import Signup from './components/Signup';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{minHeight: "100vh", overflowX: "hidden", overflowY: "auto"}}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/tests/:category_id" exact component={Tests} />
            <Route path="/search/:text_query" exact component={Search} />
            <Route path="/test/:test_id" exact component={Test} />
            <Route path="/myaccount" exact component={MyAccount} />
            <Route path='/user/login' exact component={LoginWithUsername} />
            <Route path="/signup" exact component={Signup} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
