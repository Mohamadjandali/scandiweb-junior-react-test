import { Component } from 'react';
import './App.css';
import ContextProvider from './Context';
import Navbar from './components/navbar/Navbar';
import Currencies from './components/currencies/Currencies';

export class App extends Component {

  render() {
    return (
      <ContextProvider>
        <Navbar />
      </ContextProvider>
    )
  }
}


export default App;
