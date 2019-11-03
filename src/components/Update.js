import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

export default class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: "disabled",
            username: localStorage.getItem('username'),
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const cert = document.getElementById('certifications').value;
        const qualifications = document.getElementById('qualifications').value;
        const org = document.getElementById('organization').value;
        if(username.trim().length > 3 && qualifications.trim().length > 3 && cert.trim().length > 3 && org.trim().length > 3) {
            this.showAlert("Updating...");
            fetch(`https://simpleosbackend.herokuapp.com/users/update/${username}/${cert}/${qualifications}/${org}`, {
                method: "Post"
            })
            .then(res => window.location.href = '/myaccount')
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

    componentDidMount() {
        if(!localStorage.getItem('username')) {
          window.location.href = '/';
        }
        fetch(`https://simpleosbackend.herokuapp.com/users/${this.state.username}`)
        .then(res => res.json())
        .then(data => {
          const certifications = data.certifications;
          const qualifications = data.qualifications;
          const org = data.organization;
          this.setState({disabled: ""})
          document.getElementById('certifications').value = certifications ;
          document.getElementById('qualifications').value = qualifications;
          document.getElementById('organization').value = org;
        })
        .catch(err => console.log(err));
      }

    render() {
        return (
            <div className="categories_list"> 
                <Helmet>
                    <title>{ 'Update' }</title>
                </Helmet>
                <div className="container" style={{marginTop: "150px"}}>
                    <form onSubmit={this.onSubmit}>
                        <center style={{marginBottom: 15}}><h1>Update</h1></center>
                        <h3>Certifications</h3>
                        <textarea disabled={this.state.disabled} id="certifications" className="form-control" style={{marginBottom: 15}}></textarea>
                        <h3>Qualifications</h3>
                        <textarea disabled={this.state.disabled} id="qualifications" className="form-control" style={{marginBottom: 15}}></textarea>
                        <h3>Organization</h3>
                        <input disabled={this.state.disabled} id="organization" type="text" className="form-control" style={{marginBottom: 15}} />
                        <div className="myAlert">
                            <h3 className="myAlertText">Every field should have at least 4 characters!</h3>
                        </div>
                        <input disabled={this.state.disabled} type="submit" value="Update" className="btn btn-info" style={{width: "100%", marginBottom: "30px"}} />
                    </form>
                </div>
            </div>
        );
    }
}