import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import ProductPage from './components/products/ProductPage';

export class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/tech" />} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/:category" exact component={Products} />
          <Route path="/:category/:productId" component={ProductPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
