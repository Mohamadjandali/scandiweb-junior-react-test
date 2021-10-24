import React, { Component } from 'react';
import { APIContext } from '../../Context';
import './cart.css';

export default class Cart extends Component {
  render() {
    return (
      <ul className="cart-list">
        <APIContext.Consumer>
          {({ cart }) => {
            return cart.map((item) => (
              <React.Fragment>
                <div className="cart-item">
                  <div className="cart-item-info">
                    <div>
                      <h2>{item.name}</h2>
                      <h2>{item.price}</h2>
                    </div>
                  </div>
                  <div className="cart-count">
                    <div className="cart-item-counter">
                      <span className="increment">+</span>
                      <span className="item-count">2</span>
                      <span className="decrement">-</span>
                    </div>
                    <div>
                      <img src="https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg" />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ));
          }}
        </APIContext.Consumer>
      </ul>
    );
  }
}
