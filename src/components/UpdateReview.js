import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet'

export default class MyReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review_id: props.match.params.review_id,
            disabled: true
        }
    }

    componentDidMount() {
        fetch('/api/review/reviewId/' + this.state.review_id)
        .then(res => res.json())
        .then(data => {
            document.querySelector('select').selectedIndex = data.review - 1;
            this.setState({disabled: false});
        })
        .catch(err => console.log(err));
    }

    submit = () => {
        if(!this.state.disabled) {
            const review = document.querySelector('select').value;
            fetch(`/api/reviews/update/${this.state.review_id}/${review}`, {
                method: 'POST'
            })
            .then(res => window.location.href = '/')
            .catch(err => window.location.href = '/')
        }
    }

    render() {
        return(
            <div>
                <Helmet>
                    <title>{ 'Update Review' }</title>
                </Helmet>
                <div className="tests_header">
                    <h1>Update your review</h1>
                </div>
                <div className="container" style={{marginTop: 20}}>
                    <br />
                    <h1>Update your review</h1>
                    <br />
                    <select className="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <button onClick={this.submit} className="btn btn-primary" style={{width: "100%"}}>Update</button>
                </div>
                <br />
                <br />
            </div>
        )
    }
}