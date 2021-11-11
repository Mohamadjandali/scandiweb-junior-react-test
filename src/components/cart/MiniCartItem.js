import React, { Component } from 'react';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';

export default class MiniCartItem extends Component {

  render() {
    const {
      product: { id, name, brand, gallery, prices, quantity, attributes },
      currentCurrency,
    } = this.props;
    return (
      <div key={id} className="mini-cart-item">
        <APIContext.Consumer>
          {({
            handleIncrement,
            handleDecrement,
            handleDisplayProductPrice,
          }) => {
            return (
              <React.Fragment>
                <div className="mini-cart-item-info">
                  <div className="item-desc">
                    <p>{brand}</p>
                    <p className="item-name">{name}</p>
                  </div>
                  <div className="item-price">
                    <span>{currencyIcons(currentCurrency)}</span>
                    <span>
                      {handleDisplayProductPrice(prices, currentCurrency)}
                    </span>
                  </div>
                  {attributes.length ? (
                    <div>
                      <span className="item-size">{attributes[0].item}</span>
                    </div>
                  ) : (
                    ''
                  )}
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
                  <img src={gallery} alt="product" />
                </div>
              </React.Fragment>
            );
          }}
        </APIContext.Consumer>
      </div>
    );
  }
}
