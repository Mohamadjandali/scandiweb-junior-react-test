import React, { Component, Fragment } from 'react';
import { APIContext } from '../../Context';
import MiniCartItemAttributes from './MiniCartItemAttributes';
import currencyIcons from '../navbar/CurrencyIcons';

export default class MiniCartItem extends Component {
  render() {
    const {
      product: { id, name, brand, gallery, prices, quantity, attributes },
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
                    <p onClick={() => this.handleGetAttributes(id)}>{brand}</p>
                    <p className="item-name">{name}</p>
                  </div>
                  <div className="item-price">
                    <span>{currencyIcons(currentCurrency)}</span>
                    <span>
                      {handleDisplayProductPrice(prices, currentCurrency)}
                    </span>
                  </div>
                  {attributes.map((attribute) => (
                    <MiniCartItemAttributes
                      key={attribute.id}
                      attribute={attribute}
                    />
                  ))}
                </div>
                <div className="mini-cart-item-counter">
                  <button
                    onClick={() => handleIncrement(id)}
                    className="increment"
                  >
                    +
                  </button>
                  <span className="item-count">{quantity}</span>
                  <button
                    className="decrement"
                    onClick={() => handleDecrement(id)}
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
