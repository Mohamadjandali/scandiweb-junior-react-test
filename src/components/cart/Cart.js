import React, { Component, Fragment } from 'react';
import { APIContext } from '../../Context';
import './cart.css';
import CartItem from './CartItem';

export default class Cart extends Component {
  render() {
    return (
      <APIContext.Consumer>
        {({
          cart,
          handleSortCartItems,
          currentCurrency,
          handleTotalPrice,
          handleCheckoutOut,
        }) => {
          return (
            <div className="cart-container">
              {!cart.length ? (
                <h2>Your cart is empty! :(</h2>
              ) : (
                <Fragment>
                  <div className="cart-header">
                    <h2>CART</h2>
                  </div>
                  <ul className="cart-list">
                    {handleSortCartItems(cart).map((product, index) => (
                      <CartItem key={index} product={product} />
                    ))}
                  </ul>
                </Fragment>
                /* <div className="cart-list-controlls">
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
                    </div> */
              )}
            </div>
          );
        }}
      </APIContext.Consumer>
    );
  }
}
