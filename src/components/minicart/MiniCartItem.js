import React, { Component, Fragment } from 'react';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';

export default class MiniCartItem extends Component {
  handleDisplayCartItemAttributes({ name, items }, attributeIndex) {
    return (
      <div key={attributeIndex} className="cart-item-attributes">
        <span className="cart-item-attribute-name">{name}:</span>
        <ul className="cart-item-attribute-items">
          {name === 'Color'
            ? items.map((item, index) => (
                <li
                  key={index}
                  className="color"
                  style={{ backgroundColor: item.value }}
                ></li>
              ))
            : items.map((item, index) => <li key={index}>{item.value}</li>)}
        </ul>
      </div>
    );
  }

  render() {
    const {
      product: { name, brand, gallery, prices, quantity, attributes },
      currentCurrency,
    } = this.props;
    return (
      <Fragment>
        <APIContext.Consumer>
          {({
            handleIncrement,
            handleDecrement,
            handleDisplayProductPrice,
          }) => {
            return (
              <div className="mini-cart-item">
                <div className="mini-cart-item-info">
                  <div className="item-info">
                    <p>{brand}</p>
                    <p className="item-name">{name}</p>
                  </div>
                  <div className="item-price">
                    <span>{currencyIcons(currentCurrency)}</span>
                    <span>
                      {handleDisplayProductPrice(prices, currentCurrency)}
                    </span>
                  </div>
                  {attributes.length
                    ? attributes.map((attribute, index) =>
                        this.handleDisplayCartItemAttributes(attribute, index)
                      )
                    : ''}
                </div>
                <div className="mini-cart-item-counter">
                  <button
                    onClick={() => handleIncrement(name)}
                    className="increment"
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
                <div className="mini-cart-item-image">
                  <img src={gallery[0]} alt="product" />
                </div>
              </div>
            );
          }}
        </APIContext.Consumer>
      </Fragment>
    );
  }
}
