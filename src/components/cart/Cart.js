import React, { Component } from 'react';
import { APIContext } from '../../Context';
import './cart.css';
import CartItem from './CartItem';

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 1
    }
  }

  handlePrice(cart) {
    const newPrice = cart.reduce((total, item) => {
      return total + item.item.prices[0].amount * item.quantity;
    }, 0);

    return Math.round(newPrice);
  }

  render() {
    return (
      <ul className="cart-list">
        <APIContext.Consumer>
          {({ cart, currentCurrency }) => {
            return (
              <React.Fragment>
                {!cart.length ? <h2>Your bag is empty! :(</h2> :
                  <div>
                  {cart.map(({item, quantity}) => 
                  <CartItem 
                  quantity={quantity}
                  product={item} 
                  />)}
                  <div className="cart-list-controlls">
                    <h2>TOTAL: {this.handlePrice(cart)} {currentCurrency}</h2>
                    <button className="checkout">CHECKOUT</button>
                  </div>
                  </div>
                }
              </React.Fragment>
            )
          }}
        </APIContext.Consumer>
      </ul>
    );
  }
}
