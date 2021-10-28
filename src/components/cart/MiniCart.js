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
    // this.handlePrice = this.handlePrice.bind(this);
  }

  handlePrice(cart) {
    const newPrice = cart.reduce((total, item) => {
      return total + item.prices[0].amount;
    }, 0);

    console.log(newPrice);
    return newPrice;
  }

  render() {
    return (
      <React.Fragment>
        <div className="mini-cart-list">
          <APIContext.Consumer>
            {({ cart, currentCurrency }) => {
              return (
                <div className="mini-cart-items-container">
                  {cart.length ? (
                    cart.map((item) => (
                      <MiniCartItem
                        product={item}
                        currentCurrency={currentCurrency}
                      />
                    ))
                  ) : (
                    <h3 className="empty-mini-cart">Your Bag is empty</h3>
                  )}
                  <div className="cart-controlls-container">
                    <div className="total-price">
                      <span>Total:</span>
                      <span>{this.handlePrice(cart)}</span>
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
                </div>
              );
            }}
          </APIContext.Consumer>
        </div>
      </React.Fragment>
    );
  }
}
