import { Component } from 'react';
import './App.css';
import ContextProvider from './Context';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';


export class App extends Component {

  render() {
    return (
      <ContextProvider>
        <Navbar />
        <Products />
      </ContextProvider>
    )
  }
}


export default App;
