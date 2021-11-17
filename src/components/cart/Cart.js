import React, { Component } from 'react';
import { APIContext } from '../../Context';
import './cart.css';
import CartItem from './CartItem';

export default class Cart extends Component {
  render() {
    return (
      <ul className="cart-list">
        <APIContext.Consumer>
          {({ cart, currentCurrency, handleTotalPrice, handleCheckoutOut }) => {
            return (
              <React.Fragment>
                {!cart.length ? (
                  <h2>Your bag is empty! :(</h2>
                ) : (
                  <div>
                    {cart.map((product, index) => (
                      <CartItem key={index} product={product} />
                    ))}
                    {/* <div className="cart-list-controlls">
                      <h2>
                        TOTAL:{' '}
                        {handleTotalPrice(
                          cart,
                          cart.map(({ prices }) => prices),
                          currentCurrency
                        )}{' '}
                        {currentCurrency}
                      </h2>
                      <button
                        className="checkout"
                        onClick={() => handleCheckoutOut()}
                      >
                        CHECKOUT
                      </button>
                    </div> */}
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </APIContext.Consumer>
      </ul>
    );
  }
}
