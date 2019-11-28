import React, { Component } from 'react';
import './style/home.css';

export default class UserInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://simplyopensource.in:5500/users')
        .then(err => err.json())
        .then(d => this.setState({users: d}))
        .catch(err => console.error(err))
    }

    // <tr>
    //     <td>Redis</td>
    //     <td>Redis</td>
    //     <td>Redis</td>
    //     <td>Redis</td>
    // </tr>
    render() {
        const body = this.state.users.map((u, i) => (
            <tr key={i}>
                <td>{u.username}</td>
                <td>{u.organization}</td>
                <td>{u.certifications}</td>
                <td>{u.qualifications}</td>
            </tr>
        ))
        return(
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Organization</th>
                            <th>Certifications</th>
                            <th>Qualifications</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        )
    }
}