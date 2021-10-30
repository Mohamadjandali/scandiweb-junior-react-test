import React, { Component } from 'react';
import { APIContext } from '../../Context';
import { Link } from 'react-router-dom';
import MiniCartItem from './MiniCartItem';
import './minicart.css';

export default class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="mini-cart-list">
          <APIContext.Consumer>
            {({ cart, currentCurrency, handleTotalPrice }) => {
              return (
                <React.Fragment>
                  <div className="mini-cart-items-container">
                    {cart.length ? (
                      cart.map(({ item, quantity }) => (
                        <MiniCartItem
                          key={item.name}
                          quantity={quantity}
                          product={item}
                          currentCurrency={currentCurrency}
                        />
                      ))
                    ) : (
                      <h3 className="empty-mini-cart">Your Bag is empty</h3>
                    )}
                  </div>
                  <div className="cart-controlls-container">
                    <div className="total-price">
                      <span>Total:</span>
                      <span onClick={() => this.handleGetProductsCurrencies(cart)}>
                        { cart.length && handleTotalPrice(cart, cart.map(({item}) => item.prices), currentCurrency) } {currentCurrency}
                      </span>
                    </div>
                    <div className="cart-control">
                      <Link to="/cart">
                        <div
                          className="btn-bag"
                          onClick={() => this.props.toggleMiniCart()}
                        >
                          VIEW BAG
                        </div>
                      </Link>
                      <button className="checkout">CHECK OUT</button>
                    </div>
                  </div>
                </React.Fragment>
              );
            }}
          </APIContext.Consumer>
        </div>
      </React.Fragment>
    );
  }
}
