import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyDRLmhqZ-GUKO6NlcmhZ9reM3-8W4yt2u0",
  authDomain: "simplesurvey-1f05f.firebaseapp.com",
  databaseURL: "https://simplesurvey-1f05f.firebaseio.com",
  projectId: "simplesurvey-1f05f",
  storageBucket: "simplesurvey-1f05f.appspot.com",
  messagingSenderId: "43167390067"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: ''
      },
      submitted: false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({name: name}, function(){
      console.log(this.state);
    })
    event.preventDefault();
  }

  handleQuestionSubmit(event){
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });
    this.setState({submitted: true}, function(){
      console.log("Questions submitting...");
    });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;
    if(event.target.value === 'q1'){
      answers.q1 = event.target.value;
    }else if(event.target.value === 'q2'){
      answers.q2 = event.target.value;
    }else if(event.target.value === 'q3'){
      answers.q3 = event.target.value;
    }

    this.setState({answers: answers}, function(){
      console.log(this.state);
    });
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>;
      questions = <span>
        <h3>Survey questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite OS ?</label><br />
            <input type="radio" name="q1" value="Windows" onChange= {this.handleQuestionChange}/>Windows<br />
            <input type="radio" name="q1" value="Linux" onChange= {this.handleQuestionChange}/>Linux<br />
            <input type="radio" name="q1" value="OSX" onChange= {this.handleQuestionChange}/>Mac OSX<br />
            <input type="radio" name="q1" value="Solaris" onChange= {this.handleQuestionChange}/>Solaris<br />
            <input type="radio" name="q1" value="Other" onChange= {this.handleQuestionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite smartphone brand ?</label><br />
            <input type="radio" name="q2" value="Apple" onChange= {this.handleQuestionChange}/>Apple<br />
            <input type="radio" name="q2" value="Samsung" onChange= {this.handleQuestionChange}/>Samsung<br />
            <input type="radio" name="q2" value="Huawei" onChange= {this.handleQuestionChange}/>Huawei<br />
            <input type="radio" name="q2" value="Motorola" onChange= {this.handleQuestionChange}/>Motorola<br />
            <input type="radio" name="q2" value="Other" onChange= {this.handleQuestionChange}/>Other<br />
          </div>
          <div>
            <label>What is your favorite TV brand ?</label><br />
            <input type="radio" name="q3" value="Sony" onChange= {this.handleQuestionChange}/>Sony<br />
            <input type="radio" name="q3" value="Samsung" onChange= {this.handleQuestionChange}/>Samsung<br />
            <input type="radio" name="q3" value="LG" onChange= {this.handleQuestionChange}/>LG<br />
            <input type="radio" name="q3" value="Philips" onChange= {this.handleQuestionChange}/>Philips<br />
            <input type="radio" name="q3" value="Other" onChange= {this.handleQuestionChange}/>Other<br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>;
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter name..." ref="name" />
        </form>
      </span>;
      questions = '';
    } else if(this.state.submitted === true){
      user = <h2>Thank You {this.state.name}</h2>
    }
    return (
      <div className="App">
        <header className="App-header text-center">
          <h1 className="App-title">Simple Survey</h1>
        </header>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
