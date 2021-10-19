import { Component } from 'react';
import './App.css';
import ContextProvider from './Context';
import Categories from './components/categories/Categories';

export class App extends Component {

  render() {
    return (
      <ContextProvider>
        <Categories />
      </ContextProvider>
    )
  }
}


export default App;
