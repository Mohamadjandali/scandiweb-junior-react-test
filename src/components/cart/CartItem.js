import React, { Component } from 'react';
import { APIContext } from '../../Context';

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  displayProductPrice(availableCurrencies, selectedCurrency) {
    const productPrice = availableCurrencies.find((currency) => {
      return currency.currency === selectedCurrency;
    });

    return `${productPrice.amount * this.state.quantity} ${productPrice.currency}`;
  }

  render() {
    const { name, prices, gallery, brand } = this.props.product;
    return (
      <div className="cart-item">
        <APIContext.Consumer>
          {({ currentCurrency }) => {
            return (
              <React.Fragment>
                <div className="cart-item-info">
                  <div>
                    <h2>{brand}</h2>
                    <h2>{name}</h2>
                  </div>
                  <h3 className="product-price">{this.displayProductPrice(prices, currentCurrency)}</h3>
                </div>
                <div className="cart-count">
                  <div className="cart-item-counter">
                    <button
                      className="increment"
                      onClick={() =>
                        this.setState({ quantity: this.state.quantity + 1 })
                      }
                    >
                      +
                    </button>
                    <span className="item-count">{this.state.quantity}</span>
                    <button
                      className="decrement"
                      onClick={() =>
                        this.setState({ quantity: this.state.quantity - 1 })
                      }
                      disabled={this.state.quantity === 1}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img src={gallery} />
                  </div>
                </div>
              </React.Fragment>
            );
          }}
        </APIContext.Consumer>
      </div>
    );
  }
}
