import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            disabled: "disabled"
        }
    }

    componentDidMount() {
        if(localStorage.getItem('username')) {
            window.location.href = '/';
        }
        fetch('https://simplyopensource.in:5000/users')
        .then(res => res.json())
        .then(data => this.setState({users: data, disabled: ""}))
        .catch(err => console.log(err));
    }

    onSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const cert = document.getElementById('certifications').value;
        const qualifications = document.getElementById('qualifications').value;
        const org = document.getElementById('organization').value;
        if(username.trim().length > 3 && password.trim().length > 3 &&  email.trim().length > 3 && qualifications.trim().length > 3 && cert.trim().length > 3 && org.trim().length > 3) {
            let checkAvaibility = true;
            this.state.users.forEach(user => {
                if(user.username === username) {
                    checkAvaibility = false;
                }
            });
            if(checkAvaibility) {
                this.showAlert("Creating the user!")
                fetch(`https://simplyopensource.in:5000/users/${username}/${email}/${password}/${cert}/${qualifications}/${org}`, {
                    method: "POST"
                })
                .then(res => res.json())
                .then(data => this.afterCreated(data))
                .catch(res => this.showAlert("Problems creating the user!"));
            } else {
                this.showAlert("This username is taken, please choose another one!");
            }
        } else {
            this.showAlert("Every field should have at least 4 characters!");
        }
    }

    showAlert = (s) => {
        document.querySelector('.myAlert').style.display = "block";
        document.querySelector('.myAlertText').innerHTML = s;
        setTimeout(() => {
            document.querySelector('.myAlert').style.display = "none"; 
        }, 5000)
    }

    afterCreated = (res) => {
        localStorage.setItem("username", res.username);
        localStorage.setItem('user_id', res._id);
        window.location.href = '/';
    }

    render() {
        return(
            <div className="categories_list"> 
                <Helmet>
                    <title>{ 'Sign Up' }</title>
                </Helmet>
                <div className="tests_header">
                    <h1>Sign up</h1>
                </div>
                <div className="container" style={{marginTop: "20px"}}>
                    <form onSubmit={this.onSubmit}>
                        <h3>Username: </h3>
                        <input disabled={this.state.disabled} id="username" type="text" className="form-control" style={{marginBottom: 15}} />
                        <h3>Email: </h3>
                        <input disabled={this.state.disabled} id="email" type="email" className="form-control" style={{marginBottom: 15}} />
                        <h3>Password: </h3>
                        <input disabled={this.state.disabled} id="password" type="password" className="form-control" style={{marginBottom: 15}} />
                        <h3>Certifications</h3>
                        <textarea disabled={this.state.disabled} id="certifications" className="form-control" style={{marginBottom: 15}}></textarea>
                        <h3>Qualifications</h3>
                        <textarea disabled={this.state.disabled} id="qualifications" className="form-control" style={{marginBottom: 15}}></textarea>
                        <h3>Organization</h3>
                        <input disabled={this.state.disabled} id="organization" type="text" className="form-control" style={{marginBottom: 15}} />
                        <div className="myAlert">
                            <h3 className="myAlertText">Every field should have at least 4 characters!</h3>
                        </div>
                        <input disabled={this.state.disabled} type="submit" className="btn btn-primary" style={{width: "100%", marginBottom: "30px"}} />
                    </form>
                </div>
            </div>
        );
    }
}