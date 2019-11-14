import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';

export default class Navbar  extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttonContent: localStorage.getItem('username') ? 'My Account' : 'Login',
			buttonHref: localStorage.getItem('username') ? '/myaccount' : '/login',
		}
	}

	componentDidMount() {

	}
	render() {
		return (
		<div>
			<nav class="fh5co-nav" role="navigation">
					<div class="top">
					<div class="container">
						<div class="row">
						<div class="col-xs-12 text-right">
							<p class="site">www.simplyopensource.in</p>
						</div>
						</div>
					</div>
					</div>
					<div class="top-menu">
					<div class="container">
						<div class="row">
						<div class="col-xs-2">
							<div id="fh5co-logo"><Link to={'/'}><i class="icon-study"></i>www.simplyopensource.in<span></span></Link></div>
						</div>
						<div class="col-xs-18 text-right menu-2">
							<ul>
							<li class="active"><Link to={'/'}>Home</Link></li>
							<li class="active"><Link to={'/categories'}>Categories</Link></li>
							<li class="btn-cta"><Link to={this.state.buttonHref}><span>{this.state.buttonContent}</span></Link></li>
							</ul>
						</div>
						</div>
					</div>
					</div>
				</nav>
			<div class="gototop js-top">
			<a href="#" class="js-gotop"><i class="icon-arrow-up"></i></a>
		</div>
		</div>
		);
	}
}