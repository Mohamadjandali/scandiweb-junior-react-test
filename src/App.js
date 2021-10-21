import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import ContextProvider from './Context';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';


export class App extends Component {

  render() {
    return (
      <Router>
        <ContextProvider>
          <Navbar />
          <Products />
        </ContextProvider>
      </Router>
    )
  }
}


export default App;
