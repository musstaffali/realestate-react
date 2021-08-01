import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Container} from 'reactstrap';

class App extends Component {
    render() {
        return (
          <BrowserRouter>
                <Container fluid>
                  <Main />
                </Container>
          </BrowserRouter>
        );
    };
}

export default App;