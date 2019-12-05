import React, { Component } from 'react';
import './style/test.css';
import star from '../images/star.ico';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Navbar from './Navbar'

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printIndex: 0,
      test_id: props.match.params.test_id,
      test_name: props.match.params.test_name,
      questions: [],
      answers: [],
      currentQuestion: 'Question No.1',
      length: 0,
      correctAnswers: 0,
      currentIndex: 0,
      username: localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest',
      timeLeft: 3600,
      guest: localStorage.getItem('username') ? false : true,
      quited: false,
      starDisplay: localStorage.getItem('username') ? '1' : '0',
      imageQuestions: [],
      imageQuestionsLength: 0,
      questionsLength: 0,
      href: [],
      imageAnswers: [],
      imageQuestionStage: true,
      userInput: 0,
      correctIndexes: []
    }
  }

  setTheSelect = (i) => {
    if(!this.state.imageQuestionStage || this.state.imageQuestionsLength === 0) {
      const selectDiv = document.querySelector('.selects');
      selectDiv.innerHTML = '';
      const question = this.state.questions[i];
      const answer = this.state.answers[i];
      let answers;
      if(answer === null) {
        answers = ['A'];
      } else {
        answers = answer.split(',');
      }
      answers.forEach((answer, i) => {
        const select = document.createElement('select');
        select.className = 'custom-select';
        select.innerHTML = `
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>`;
        select.id = `answer_${i}`
        select.style.marginBottom = "10px";
        if(question.includes('E.')) {
          select.innerHTML += `<option value="E">E</option>`
        }
        if(question.includes('F.')) {
          select.innerHTML += `<option value="F">F</option>`
        }
        if(question.includes('G.')) {
          select.innerHTML += `<option value="G">G</option>`
        }
        if(question.includes('H.')) {
          select.innerHTML += `<option value="H">H</option>`
        }
        if(question.includes('I.')) {
          select.innerHTML += `<option value="I">I</option>`
        }
        selectDiv.appendChild(select);
      });
    } else {
      const selectDiv = document.querySelector('.selects');
      selectDiv.innerHTML = '';
      const question = this.state.imageQuestions[i];
      const answer = this.state.imageAnswers[i];
      let answers;
      console.log(this.state.imageQuestionsLength)
      answers = answer.split(',');
      answers.forEach((answer, i) => {
        const select = document.createElement('select');
        select.className = 'custom-select';
        select.innerHTML = `
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>`;
        select.id = `answer_${i}`
        select.style.marginBottom = "10px";
        if(question.includes('E.')) {
          select.innerHTML += `<option value="E">E</option>`
        }
        if(question.includes('F.')) {
          select.innerHTML += `<option value="F">F</option>`
        }
        if(question.includes('G.')) {
          select.innerHTML += `<option value="G">G</option>`
        }
        if(question.includes('H.')) {
          select.innerHTML += `<option value="H">H</option>`
        }
        if(question.includes('I.')) {
          select.innerHTML += `<option value="I">I</option>`
        }
        selectDiv.appendChild(select);
      });
    }
  }

  changeQuestion = () => {
    const selectDiv = document.querySelector('.selects');
    let answer = [];
    if(selectDiv.childElementCount === 1) {
      answer = document.getElementById(`answer_0`).value;
    } else {
      for(let i = 1; i <= selectDiv.childElementCount; i++) {
        const select = document.getElementById(`answer_${i - 1}`);
        if(i === selectDiv.childElementCount) {
          answer += select.value;
        } else {
          answer += select.value + ',';
        }
      }
    }
    if(this.state.currentIndex !== this.state.length - 1) {
      let userAnswer = answer;
      if(!this.state.imageQuestionStage || this.state.imageQuestionsLength === 0) {
        if(/\s+$/.test(this.state.answers[this.state.currentIndex - this.state.imageQuestionsLength])) {
          userAnswer += ' ';
        }
        if(userAnswer === this.state.answers[this.state.currentIndex - this.state.imageQuestionsLength]) {
          const correctAnswers = this.state.correctIndexes;
          correctAnswers.push(this.state.currentIndex);
          this.setState({correctAnswers: this.state.correctAnswers + 1, correctIndexes: correctAnswers})
        }
      } else {
        if(/\s+$/.test(this.state.imageAnswers[this.state.currentIndex])) {
          userAnswer += ' ';
        }
        if(userAnswer === this.state.imageAnswers[this.state.currentIndex]) {
          const correctAnswers = this.state.correctIndexes;
          correctAnswers.push(this.state.currentIndex);
          this.setState({correctAnswers: this.state.correctAnswers + 1, correctIndexes: correctAnswers})
        }
      }
      const select = document.querySelector('.custom-select');
      const question = document.querySelector('.question');
      this.setState({currentIndex: this.state.currentIndex + 1}, () => {
        if(this.state.imageQuestionsLength <= this.state.currentIndex) {
          this.setState({imageQuestionStage: false}, () => {
            select.selectedIndex = 0;
            this.setTheSelect(this.state.currentIndex - this.state.imageQuestionsLength);
            question.innerHTML = `${this.state.currentIndex + 1}/${this.state.length}<br/><br/>${this.state.questions[this.state.currentIndex - this.state.imageQuestionsLength]}`;  
          })
        } else {
          select.selectedIndex = 0;
          this.setTheSelect(this.state.currentIndex);
          question.innerHTML = `${this.state.currentIndex + 1}/${this.state.length}<br/><br/>${this.state.imageQuestions[this.state.currentIndex]}
          <br><br>
          <center>
            <img src="${this.state.href[this.state.currentIndex]}" class="image_test" />
          </center>`;
        }
      });
    } else {
      const userAnswer = answer;
      if(userAnswer === this.state.answers[this.state.currentIndex]) {
        let correctAnswerss = this.state.correctIndexes;
        correctAnswerss.push(this.state.currentIndex);
        this.setState({correctAnswers: this.state.correctAnswers + 1, correctIndexes: correctAnswerss}, () => {
          console.log(this.state.correctIndexes)
          const output = `
            <h2>You finished, ${this.state.username}!<br/><br />You got ${this.state.correctAnswers}/${this.state.length} </h2><br />
            `;
          document.querySelector('.info').innerHTML = output;
          this.printTheAnswersAtLast();
          document.querySelector('.info').style.color = 'white';
          if(this.state.username !== "Guest") {
            //console.log(`https://simpleosbackend.herokuapp.com/users/addTest/${this.state.username}/${this.state.test_id}`)
            fetch(`https://simplyopensource.in:5000/users/addTest/${localStorage.getItem('user_id')}/${this.state.test_id}`, {
              method: "Post"
            })
            .then(res => res.json());
          }
        });
      } else {
        let result;
        const half = this.state.questions.length / 2;
        if(this.state.correctAnswers < half) {
          result = 'failed';
        } else {
          result = 'passed';
        }
        console.log(this.state.correctIndexes)
        const output = `
        <h2>You ${result} the test, ${this.state.username}!<br/><br />You got ${this.state.correctAnswers}/${this.state.length} </h2><br />
        `;
        document.querySelector('.info').innerHTML = output;
        this.printTheAnswersAtLast();
        if(this.state.username !== "Guest" && !this.state.quited) {
          //console.log(`https://simpleosbackend.herokuapp.com/users/addTest/${this.state.username}/${this.state.test_id}`)
          fetch(`https://simplyopensource.in:5000/users/addTest/${localStorage.getItem('user_id')}/${this.state.test_id}`, {
            method: "Post"
          })
          .then(res => res.json());
        }
      }
    }
  }

  quit = () => {
    this.setState({currentIndex: this.state.length - 1, quited: true, printIndex: this.state.currentIndex}, () => {
      this.changeQuestion();
    });
  }

  componentDidMount() {
    if(!this.state.guest) {
      const time = window.prompt('Enter the minutes you have to attend the test:');
      const answers = window.prompt('Enter the number of questions you want to attend: ');
      if(time > 0 && answers > 0) {
        this.setState({timeLeft: time * 60, userInput: answers})
      } else {
        alert('Time not valid, the length of the test set to default!')
      }
    }
    fetch('https://simplyopensource.in:5000/imageQuestion/' + this.state.test_id)
    .then(res => res.json())
    .then(data => {
      let questions = [];
      let answers = [];
      let href = [];
      data.forEach(q => {
        let myQuestion = q.question;
        myQuestion = myQuestion.replace('A.', '<br><br>A.');
        myQuestion = myQuestion.replace('B.', '<br>B.');
        myQuestion = myQuestion.replace('C.', '<br>C.');
        myQuestion = myQuestion.replace('D.', '<br>D.');
        myQuestion = myQuestion.replace('E.', '<br>E.');
        myQuestion = myQuestion.replace('F.', '<br>F.');
        myQuestion = myQuestion.replace('G.', '<br>G.');
        myQuestion = myQuestion.replace('H.', '<br>H.');
        myQuestion = myQuestion.replace('I.', '<br>I.');
        questions.push(myQuestion);
        href.push(q.href);
        answers.push(q.answer);
      });
      this.setState({ imageQuestionsLength: data.length , href: href, imageAnswers: answers ,imageQuestions: questions, length: this.state.length + data.length}, () => {
        if(this.state.guest) {
          if(this.state.imageQuestionsLength > 0) {
            this.setState({length: 10}, () => {
              document.querySelector('.container').style.display = 'block';
              document.getElementById('loading_test').style.display = 'none';
              const question = document.querySelector('.question');
              question.innerHTML = `${this.state.imageQuestions[this.state.currentIndex]}
            <br>
            <br>
            <center>
              <img src="${this.state.href[0]}" class="image_test" />
            </center>`;
              this.setTheSelect(0);
            });
            if(this.state.userInput <= this.state.length && this.state.userInput > 0) {
              this.setState({length: this.state.userInput})
            } 
          }
        } else {
          if(this.state.imageQuestionsLength > 0) {
            document.querySelector('.container').style.display = 'block';
            document.getElementById('loading_test').style.display = 'none';
            const question = document.querySelector('.question');
            question.innerHTML = `${this.state.imageQuestions[this.state.currentIndex]}
            <br>
            <br>
            <center>
              <img src="${this.state.href[0]}" class="image_test" />
            </center>`;
            this.setTheSelect(0); 
          }
        }
      })
    })
    fetch(`https://simplyopensource.in:5000/test/${this.state.test_id}`)
    .then(res => res.json())
    .then(data => {
      let myData = [];
      data.questions.forEach(question => {
        let myQuestion = question;
        myQuestion = myQuestion.replace('A.', '<br><br>A.');
        myQuestion = myQuestion.replace('B.', '<br>B.');
        myQuestion = myQuestion.replace('C.', '<br>C.');
        myQuestion = myQuestion.replace('D.', '<br>D.');
        myQuestion = myQuestion.replace('E.', '<br>E.');
        myQuestion = myQuestion.replace('F.', '<br>F.');
        myQuestion = myQuestion.replace('G.', '<br>G.');
        myQuestion = myQuestion.replace('H.', '<br>H.');
        myQuestion = myQuestion.replace('I.', '<br>I.');
        myData.push(myQuestion);
      });
      if(this.state.guest) {
        this.setState({questions: myData, answers: data.answers, length: 10}, () => {
          document.querySelector('.container').style.display = 'block';
          document.getElementById('loading_test').style.display = 'none';
          if(this.state.imageQuestionsLength === 0) {
            this.setTheSelect(0);
            const question = document.querySelector('.question');
            question.innerHTML = `${this.state.questions[this.state.currentIndex]}`;
          }
          this.shuffle(this.state.answers, this.state.questions);
        });
      } else {
        this.setState({questions: myData, answers: data.answers, length: this.state.length + myData.length}, () => {
          document.querySelector('.container').style.display = 'block';
          document.getElementById('loading_test').style.display = 'none';
          if(this.state.imageQuestionsLength === 0) {
            this.setTheSelect(0);
            const question = document.querySelector('.question');
            question.innerHTML = `${this.state.questions[this.state.currentIndex]}`;
          }
          this.shuffle(this.state.answers, this.state.questions);
          if(this.state.userInput <= this.state.length && this.state.userInput > 0) {
            this.setState({length: this.state.userInput})
          } 
        });
      }
    })
    .catch(err => console.log(err));
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
            if(secondsLeft >= 10) {
              try {
                document.querySelector('.time_left').innerHTML = `${minutes}:${secondsLeft}`;
              } catch(e) {}
            } else {
              try {
                document.querySelector('.time_left').innerHTML = `${minutes}:0${secondsLeft}`;
              } catch(e) {}
            }
          }
        }); 
      }
    }, 1000);
  }

  shuffle = (array, array1) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    var currentIndex1 = array1.length, temporaryValue1;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      currentIndex1 -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      temporaryValue1 = array1[currentIndex];
      array1[currentIndex] = array1[randomIndex];
      array1[randomIndex] = temporaryValue1;
    }
    this.setState({answers: array, questions: array1})
  }

  printTheAnswersAtLast = () => {
    let output = '<center>';
    if(this.state.printIndex === 0) {
      for(let i = 0; i < this.state.length; i++) {
        if(this.state.correctIndexes.includes(i)) {
          output += `<h3 style="color: #97c14b">Answer ${i + 1} is correct, ${this.state.answers[i]}</h3>`;
        } else {
          output += `<h3 style="color: red">Answer ${i + 1} is wrong. The correct answer is ${this.state.answers[i]}</h3>`;
        }
      }
    } else {
      for(let i = 0; i < this.state.printIndex; i++) {
        if(this.state.correctIndexes.includes(i)) {
          output += `<h3 style="color: #97c14b">Answer ${i + 1} is correct</h3>`;
        } else {
          output += `<h3 style="color: red">Answer ${i + 1} is wrong</h3>`;
        }
      }
    }
    
    output += '</center>'
    document.querySelector('.info').innerHTML += output;
    console.log(output)
  }
  render() {
    return (
      <div className="test_container" style={{fontFamily: 'Comic Sans MS'}}>
        <Helmet>
          <title>{ this.state.test_name }</title>
        </Helmet>
        <div className="container" style={{marginTop: '40px', background: "#3b444b", padding: 30, borderRadius: 10, display: 'none'}}>
          <Link to={'/review/' + this.state.test_id}>
            <img alt="Ghey" style={{width: 30, float: 'right', opacity: this.state.starDisplay}} src={star} />
          </Link>
          <div className="info">    
            <div className="timer" style={{textAlign: 'center', padding: 5}}>
            <h5 className="time_left" style={{fontFamily: 'Lucida Sans'}}></h5>
            </div>
            <h4 style={{fontFamily: 'Lucida Sans'}} className="question">Question No.1 <br /><br /> Correct answer is b</h4>
            <div className="selects">
            </div>
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