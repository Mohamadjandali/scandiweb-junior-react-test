import React, { Component, Fragment } from 'react';
import { APIContext } from '../../Context';
import './cart.css';
import CartItem from './CartItem';
import currencyIcons from '../navbar/CurrencyIcons';

export default class Cart extends Component {
  render() {
    return (
      <APIContext.Consumer>
        {({
          cart,
          handleSortCartItems,
          currentCurrency,
          handleTotalPrice,
          cartItemAttributes,
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
                      <CartItem 
                        key={index} 
                        product={product} 
                        cartItemAttributes={cartItemAttributes}
                      />
                    ))}
                  </ul>
                  <div className="cart-list-controlls">
                    <h2>
                      TOTAL: <span>{currencyIcons(currentCurrency)}</span>
                      {handleTotalPrice(
                        cart,
                        cart.map(({ prices }) => prices),
                        currentCurrency
                      )}{' '}
                    </h2>
                    <button
                      className="checkout"
                      onClick={() => handleCheckoutOut()}
                    >
                      CHECKOUT
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          );
        }}
      </APIContext.Consumer>
    );
  }
}
