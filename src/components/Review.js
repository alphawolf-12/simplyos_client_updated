import React, { Component } from 'react';
import star from '../images/star.ico';
import './style/review_star.css';

export default class Reivew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            reviews: [],
            post_id: props.match.params.post_id,
            user_id: localStorage.getItem('user_id'),
            comments: [],
            disabled: true
        }
    }

    starsHover = () => {
        if(!this.state.disabled) {
            document.querySelector('.svg_1').addEventListener('click', (e) => {
                document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                e.target.style.fill = 'orange';
                this.setState({rating: 1});
            });
            document.querySelector('.svg_2').addEventListener('click', (e) => {
                document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                e.target.style.fill = 'orange'
                document.querySelector('.svg_1').style.fill = 'orange';
                this.setState({rating: 2})
            });
            document.querySelector('.svg_3').addEventListener('click', (e) => {
                document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                e.target.style.fill = 'orange'
                document.querySelector('.svg_1').style.fill = 'orange';
                document.querySelector('.svg_2').style.fill = 'orange';
                this.setState({rating: 3})
            });
            document.querySelector('.svg_4').addEventListener('click', (e) => {
                document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                e.target.style.fill = 'orange'
                document.querySelector('.svg_1').style.fill = 'orange';
                document.querySelector('.svg_2').style.fill = 'orange';
                document.querySelector('.svg_3').style.fill = 'orange';
                this.setState({rating: 4})
            });
            document.querySelector('.svg_5').addEventListener('click', (e) => {
                document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                e.target.style.fill = 'orange'
                document.querySelector('.svg_1').style.fill = 'orange';
                document.querySelector('.svg_2').style.fill = 'orange';
                document.querySelector('.svg_3').style.fill = 'orange';
                document.querySelector('.svg_4').style.fill = 'orange';
                this.setState({rating: 5})
            });
        }
    }

    componentDidMount() {
        this.starsHover();
        if(!localStorage.getItem('username') || !localStorage.getItem('user_id')) {
            window.location.href = '/';
        }
        fetch(`https://simpleosbackend.herokuapp.com/users/${localStorage.getItem('username')}`)
        .then(res => res.json())
        .then(data => {
            if(data === null) {
                window.location.href = '/';
            } else {
                this.setState({reviews: data.reviews}, () => {
                    if(this.state.reviews.includes(this.state.post_id)) {
                        this.getTheLatestReview();
                        document.getElementById('submit_review').disabled = 'disabled';
                    } else {
                        this.setState({disabled: false})
                    }
                })
                //console.log(data.reviews);
            }
        })
        .catch(err => console.log(err));
        fetch(`http://simpleosbackend.herokuapp.com/comments/post/${this.state.post_id}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0) {
                document.getElementById('comments_list').innerHTML += '<li class="list-group-item">There are not any comments yet!</li>'
            } else {
                this.setState({comments: data.reverse()})
            }
        })
    }

    getTheLatestReview = () => {
        fetch(`http://simpleosbackend.herokuapp.com/reviews/user/${this.state.user_id}/${this.state.post_id}`)
        .then(res => res.json())
        .then(data => {
            const review = data.review;
            switch(review) {
                case 5:
                    document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                    document.querySelector('.svg_5').style.fill = 'orange';
                    document.querySelector('.svg_1').style.fill = 'orange';
                    document.querySelector('.svg_2').style.fill = 'orange';
                    document.querySelector('.svg_3').style.fill = 'orange';
                    document.querySelector('.svg_4').style.fill = 'orange';
                    this.setState({rating: 5})
                    break;
                case 4:
                    document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                    document.querySelector('.svg_1').style.fill = 'orange';
                    document.querySelector('.svg_2').style.fill = 'orange';
                    document.querySelector('.svg_3').style.fill = 'orange';
                    document.querySelector('.svg_4').style.fill = 'orange';
                    this.setState({rating: 4})
                    break;
                case 3:
                    document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                    document.querySelector('.svg_1').style.fill = 'orange';
                    document.querySelector('.svg_2').style.fill = 'orange';
                    document.querySelector('.svg_3').style.fill = 'orange';
                    this.setState({rating: 3})
                    break;
                case 2:
                    document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                    document.querySelector('.svg_1').style.fill = 'orange';
                    document.querySelector('.svg_2').style.fill = 'orange';
                    this.setState({rating: 2})
                    break;
                case 1:
                    document.querySelectorAll('polygon').forEach(s => s.style.fill = 'white');
                    document.querySelector('.svg_1').style.fill = 'orange';
                    this.setState({rating: 1})
                    break;
            }
        })
        .catch(err => console.log(err));
    }

    sendReview = () => {
        if(this.state.rating !== 0) {
            if(window.confirm('Are you sure you want to submit your review?')) {
                fetch(`http://simpleosbackend.herokuapp.com/tests/review/${this.state.rating}/${this.state.post_id}/${this.state.user_id}`, {
                    method: 'POST'
                }).then(res => window.location.reload())
                .catch(err => window.location.reload())
            }
        } 
    }

    addComment = (e) => {
        e.preventDefault();
        const comment = document.getElementById('comment_input').value;
        const comment1 = document.getElementById('comment_input').value.replace(' ', '');
        if(comment1.length > 0) {
            this.fetchComment(localStorage.getItem('username') + ': ' + comment);
        }
    }

    fetchComment = (c) => {
        fetch(`http://simpleosbackend.herokuapp.com/comments/add/${c}/${this.state.user_id}/${this.state.post_id}`, {
            method: 'POST'
        }).then(d => {
            fetch(`http://simpleosbackend.herokuapp.com/comments/post/${this.state.post_id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({comments: data.reverse()})}
            )
        })
    }

    render() {
        this.starsHover();
        const output = this.state.comments.map((comment, i) => (
            <li key={i} class="list-group-item">{comment.comment}</li>
        ))
        return(
            <div style={{marginTop: 150}}>
                <div className="review">
                    <div className="stars">
                        <svg height="100" width="100">
                            <polygon className="svg_1" points="50,5 20,99 95,39 5,39 80,99"
                            style={{fill:'white', stroke: 'black', fillRule:'nonzero'}} />
                        </svg>
                        <svg height="100" width="100">
                            <polygon className="svg_2" points="50,5 20,99 95,39 5,39 80,99"
                            style={{fill:'white', stroke: 'black', fillRule:'nonzero'}} />
                        </svg>
                        <svg height="100" width="100">
                            <polygon className="svg_3" points="50,5 20,99 95,39 5,39 80,99"
                            style={{fill:'white', stroke: 'black', fillRule:'nonzero'}} />
                        </svg>
                        <svg height="100" width="100">
                            <polygon className="svg_4" points="50,5 20,99 95,39 5,39 80,99"
                            style={{fill:'white', stroke: 'black', fillRule:'nonzero'}} />
                        </svg>
                        <svg height="100" width="100">
                            <polygon className="svg_5" points="50,5 20,99 95,39 5,39 80,99"
                            style={{fill:'white', stroke: 'black', fillRule:'nonzero'}} />
                        </svg>
                    </div>
                    <br /><br />
                    <button onClick={this.sendReview} id="submit_review" className="btn btn-info" style={{width: '80vw', marginLeft: '10vw',}}>Submit your review</button>
                    <br /><br />
                    <center><h1>Your review: {this.state.rating}/5</h1></center>
                </div>
                <div className="alredy_reviewed" style={{display: 'none'}}>
                    
                </div>
                <div className="container">
                    <h5 style={{marginBottom: '20px'}}>Comments</h5>
                    <ul class="my_llist" id="comments_list">
                        {output}
                    </ul>
                    <form style={{marginTop: '20px'}} onSubmit={this.addComment}>
                        <h5 style={{marginBottom: '20px'}}>Add your comment</h5>
                        <input id="comment_input" className="form-control" placeholder="Comment:" />
                        <input className="btn btn-info" type="submit" style={{width: "100%", marginTop: "20px"}} />
                    </form>
                </div>
                <br />
            </div>
        );
    }
}