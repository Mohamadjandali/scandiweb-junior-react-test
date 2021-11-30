import React, { Component } from 'react';
import { APIContext } from '../../Context';
import { Link } from 'react-router-dom';
import currencyIcons from '../navbar/CurrencyIcons';
import MiniCartItem from './MiniCartItem';
import './minicart.css';

export default class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.props.miniCartRef &&
      !this.props.miniCartRef.current.contains(event.target)
    ) {
      this.props.toggleMiniCart();
    }
  }

  render() {
    return (
      <React.Fragment>
        <APIContext.Consumer>
          {({
            cart,
            currentCurrency,
            handleTotalPrice,
            handleCheckoutOut,
            cartItemAttributes,
          }) => {
            return (
              <div className={this.props.toggleCart ? 'mini-cart-list' : ''}>
                <div className="mini-cart-count">
                  My Bag.{' '}
                  {cart.length !== 1 ? (
                    <span>{cart.length} items</span>
                  ) : (
                    <span>{cart.length} item</span>
                  )}
                </div>
                <div className="mini-cart-items-container">
                  {cart &&
                    cart.map((product) => {
                      return (
                        <MiniCartItem
                          cart={cart}
                          cartItemAttributes={cartItemAttributes}
                          key={product.id}
                          product={product}
                          currentCurrency={currentCurrency}
                        />
                      );
                    })}
                </div>
                <div className="cart-controlls-container">
                  <div className="total-price">
                    <span>Total:</span>
                    <span className="price">
                      {currencyIcons(currentCurrency)}
                      {cart.length &&
                        handleTotalPrice(
                          cart,
                          cart.map(({ prices }) => prices),
                          currentCurrency
                        )}
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
                    <button
                      className="checkout"
                      disabled={!cart.length}
                      onClick={() => handleCheckoutOut()}
                    >
                      CHECK OUT
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
        </APIContext.Consumer>
      </React.Fragment>
    );
  }
}
