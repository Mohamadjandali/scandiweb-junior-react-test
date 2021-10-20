import { Component } from 'react';
import './App.css';
import ContextProvider from './Context';
import Categories from './components/categories/Categories';
import Navbar from './components/navbar/Navbar';

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
