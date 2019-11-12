import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet'

export default class MyReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.match.params.user_id,
            user_reviews: [],
            username: localStorage.getItem('username'),
            posts: []
        }
    }
    componentDidMount() {
        fetch('https://simpleosbackend.herokuapp.com/reviews/user/' + this.state.user_id)
        .then(res => res.json())
        .then(res => {
            this.setState({user_reviews: res}, () => {
                this.fetchReviews();
            });
        })
        .catch(err => console.log(err));
    }

    ///users/title/:id
    fetchReviews = () => {
        this.state.user_reviews.forEach(review => {
            fetch('https://simpleosbackend.herokuapp.com/users/title/' + review.post_id)
            .then(res => res.json())
            .then(data => {
                let posts = this.state.posts;
                posts.push({title: data.title, id: review._id, review: review.review})
                this.setState({posts: posts});
            })
            .catch(err => console.log(err));
        })
    }

    render() {
        const reviewsOutput = this.state.posts.map((post, i) =>{ 
            let output = '';
            for(let i = 0; i < post.review; i++) {
                output += '⭐';
            }
            return(
                <Link to={'/reviews/update/' + post.id}>
                    <div className="test">
                    <h5 style={{float: 'right'}}>{output}</h5>
                    <br />
                    <h2>{post.title}</h2>
                    </div>
                </Link>
            )
        })
        return(
            <div>
                <Helmet>
                    <title>{  this.state.username + ' Reviews' }</title>
                </Helmet>
                <div className="tests_header">
                <h1>{this.state.username + " Reviews"}</h1>
                </div>
                <div className="container" style={{marginTop: 20}}>
                <br />
                <h1>Results | {this.state.posts.length}</h1>
                    {reviewsOutput}
                </div>
                <br />
                <br />
            </div>
        )
    }
}