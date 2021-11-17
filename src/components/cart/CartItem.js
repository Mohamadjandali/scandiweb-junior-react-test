import React, { Component } from 'react';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import CartItemAttributes from './CartItemAttributes';

export default class CartItem extends Component {
  displayProductPrice(availableCurrencies, selectedCurrency) {
    const productPrice = availableCurrencies.find((currency) => {
      return currency.currency === selectedCurrency;
    });

    return productPrice.amount;
  }

  render() {
    const {
      product: { name, prices, gallery, brand, quantity, attributes, id },
    } = this.props;
    return (
      <div className="cart-item">
        <APIContext.Consumer>
          {({
            currentCurrency,
            handleIncrement,
            handleDecrement,
            handleDisplayProductPrice,
          }) => {
            return (
              <React.Fragment>
                <div className="cart-item-info">
                  <div>
                    <h2>{brand}</h2>
                    <h2>{name}</h2>
                  </div>
                  <h3 className="product-price">
                    {currencyIcons(currentCurrency)}
                    {handleDisplayProductPrice(prices, currentCurrency)}
                  </h3>
                  {attributes &&
                    attributes.map((attribute, index) => (
                      <CartItemAttributes
                        key={index}
                        cartItemId={id}
                        attribute={attribute}
                        cartItemName={name}
                      />
                    ))}
                </div>
                <div className="cart-count">
                  <div className="cart-item-counter">
                    <button
                      className="increment"
                      onClick={() => handleIncrement(name)}
                    >
                      +
                    </button>
                    <span className="item-count">{quantity}</span>
                    <button
                      className="decrement"
                      onClick={() => handleDecrement(name)}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img src={gallery} alt="cart item" />
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
