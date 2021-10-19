import { Component } from 'react';
import './App.css';
import ContextProvider from './Context';

export class App extends Component {

  render() {
    return (
      <ContextProvider>
      </ContextProvider>
    )
  }
}


export default App;
