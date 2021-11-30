import React, { Component, Fragment } from 'react';
import { APIContext } from '../../Context';
import MiniCartItemAttributes from './MiniCartItemAttributes';
import currencyIcons from '../navbar/CurrencyIcons';

export default class MiniCartItem extends Component {

  handleGetAttributes(id) {
    const foundAttributes = this.props.cartItemAttributes.slice();
    const tes = foundAttributes.find((item) => {
      return item.productId === id;
    })

    return tes ? tes.attributes : false;
  }

  render() {
    const {
      product: { id, name, brand, gallery, prices, quantity },
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
                  {
                    this.handleGetAttributes(id) && this.handleGetAttributes(id).map((attribute, index) => (
                      attribute.value && 
                        <MiniCartItemAttributes
                          attribute={attribute}
                          key={index}
                        /> 
                    )) 
                  }
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
