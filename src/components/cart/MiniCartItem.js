import React, { Component } from 'react';
import { APIContext } from '../../Context';

export default class MiniCartItem extends Component {
  render() {
    const {
      product: { name, brand, gallery, prices },
      currentCurrency,
      quantity,
      attributes,
      id,
    } = this.props;
    return (
      <div className="mini-cart-item">
        <APIContext.Consumer>
          {({
            handleIncrement,
            handleDecrement,
            handleDisplayProductPrice,
            handleRemoveItemCart,
          }) => {
            return (
              <React.Fragment>
                <div className="mini-cart-item-info">
                  <div className="item-desc">
                    <p>{brand}</p>
                    <p className="item-name">{name}</p>
                  </div>
                  <span className="mini-cart-item-price">
                    {handleDisplayProductPrice(prices, currentCurrency)}
                  </span>
                  <span
                    onClick={() => handleRemoveItemCart(id)}
                    className="delete-product"
                  >
                    remove
                  </span>
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
                    disabled={quantity === 1}
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
