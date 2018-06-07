import React, { Component } from 'react';
import './App.css';
import {scanForProblems} from 'accessibilityjs'
import ReactHtmlParser from 'react-html-parser';
import * as _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      html: ''
    };

    this.scan = this.scan.bind(this);
    this.logError = this.logError.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const errorMessages = _.map(this.state.errorMessages, error => {
      return <div>{error}</div>
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HTML A11y</h1>
        </header>
        <div class="container">
          <div class="description">This site is to test your HTML for accessibility errors. HTML A11y uses requirements listed in 508 Reference Guide - 1194.22 from the US Access Board, and checks for conformity against the Web Content Accessibility Guidelines 2.0 at Level AA.</div>
          <div class="description">Enter your HTML here. HTML must be valid.</div>
          <textarea aria-label="HTML entry box" value={this.state.html} onChange={this.handleChange}></textarea>
          <p className="App-intro">
            {errorMessages}
          </p>
          <div class="parsed">{ ReactHtmlParser(this.state.html) }</div>
          <button onClick={this.scan}>Scan HTML</button>
        </div>
        

      </div>
    );
  }

  scan() {
    this.setState({ errorMessages: []});
    scanForProblems(document, this.logError);
  }

  logError(error) {
    console.log(error);
    let errorMessages = this.state.errorMessages.concat([error.message]);
    this.setState({
      errorMessages: errorMessages
    })
  }

  handleChange(event) {
    this.setState({html: event.target.value});
  }
}

export default App;
