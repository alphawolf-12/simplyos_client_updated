import React, { Component } from 'react';
import './style/test.css';
import star from '../images/star.ico';
import {Link} from 'react-router-dom';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test_id: props.match.params.test_id,
      questions: [],
      answers: [],
      currentQuestion: 'Question No.1',
      length: 5,
      correctAnswers: 0,
      currentIndex: 0,
      username: localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest',
      timeLeft: 3600
    }
  }

  changeQuestion = () => {
    if(this.state.currentIndex !== this.state.length - 1) {
      const select = document.querySelector('.custom-select');
      const userAnswer = select.options[select.selectedIndex].value;
      if(userAnswer === this.state.answers[this.state.currentIndex]) {
        this.setState({correctAnswers: this.state.correctAnswers + 1});
      }
      const question = document.querySelector('.question');
      this.setState({currentIndex: this.state.currentIndex + 1}, () => {
      select.selectedIndex = 0;
      question.innerHTML = `${this.state.currentIndex + 1}/${this.state.length}<br/><br/>${this.state.questions[this.state.currentIndex]}`;
      });
    } else {
      const output = `
        <h2>You finished, ${this.state.username}!<br/><br />You got ${this.state.correctAnswers}/${this.state.length} </h2><br />
        `;
      document.querySelector('.info').innerHTML = output;
      fetch(`http://simpleosbackend.herokuapp.com/users/addTest/${this.state.username}/${this.state.test_id}`, {
        method: "Post"
      })
      .then(res => res.json());
      
    }
  }

  quit = () => {
    this.setState({currentIndex: this.state.length - 1}, () => {
      this.changeQuestion();
    });
  }

  componentDidMount() {
    fetch(`https://simpleosbackend.herokuapp.com/test/${this.state.test_id}`)
    .then(res => res.json())
    .then(data => {
      let myData = [];
      data.questions.forEach(question => {
        let myQuestion = question;
        myQuestion = myQuestion.replace('A.', '<br><br>A.');
        myQuestion = myQuestion.replace('B.', '<br>B.');
        myQuestion = myQuestion.replace('C.', '<br>C.');
        myQuestion = myQuestion.replace('D.', '<br>D.');
        myData.push(myQuestion);
      });
      this.setState({questions: myData, answers: data.answers, length: myData.length}, () => {
        document.querySelector('.container').style.display = 'block';
        document.getElementById('loading_test').style.display = 'none';
        const question = document.querySelector('.question');
        question.innerHTML = `${this.state.currentIndex + 1}/${this.state.length}<br/><br/>${this.state.questions[this.state.currentIndex]}`;
      });
    })
    .catch(err => alert('Error Occured!'));

    setInterval(() => {
      if(this.state.timeLeft === 0 && this.statecurrentIndex === this.state.length - 1) {
        this.quit();
      } else {
        this.setState({timeLeft: this.state.timeLeft - 1}, () => {
          if(this.state.timeLeft === 0) {
            this.quit();
          } else {
            const timeLeft = this.state.timeLeft;
            const minutes = Math.floor(timeLeft / 60);
            const secondsLeft = timeLeft - (minutes * 60);
            try {
              document.querySelector('.time_left').innerHTML = `${minutes}:${secondsLeft}`;
            } catch(e) {

            }
          }
        }); 
      }
    }, 1000);
  }
  render() {
    return (
      <div className="test_container">
        <br /><br />
        <div className="container" style={{background: "#3b444b", padding: 30, borderRadius: 10, display: 'none'}}>
          <Link to={'/reviews/' + this.state.test_id}>
            <img style={{width: 30, float: 'right'}} src={star} />
          </Link>
          <div className="info">    
            <div className="timer" style={{textAlign: 'center', padding: 5}}>
              <h5 className="time_left">60:00</h5>
            </div>
            <h4 className="question">Question No.1 <br /><br /> Correct answer is b</h4>
            <select class="custom-select">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <br /><br />
            <button onClick={this.changeQuestion} className="btn btn-success" style={{float: "right"}}>Next</button>
            <button onClick={this.quit} className="btn btn-danger" style={{float: "right", marginRight: 15}}>Quit</button>
            <br />
          </div>      
        </div>
        <div id="loading_test" style={{width: "80vw", margin: "auto", position: 'inherit'}} className="alert alert-success">
          Loading...
        </div>
      </div>
    );
  }
}