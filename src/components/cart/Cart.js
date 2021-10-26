import React, { Component } from 'react';
import { APIContext } from '../../Context';
import './cart.css';
import CartItem from './CartItem';

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
  }

  render() {
    return (
      <ul className="cart-list">
        <APIContext.Consumer>
          {({ cart }) => {
            return cart.map((item) => 
              <CartItem 
                product={item} 
              />);
          }}
        </APIContext.Consumer>
      </ul>
    );
  }
}
