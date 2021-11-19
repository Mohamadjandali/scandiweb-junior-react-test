import React, { Component, Fragment } from 'react';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import CartItemAttributes from './CartItemAttributes';

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemImageIndex: 0,
    };
    this.handleIncrementCartItemImageSlide =
      this.handleIncrementCartItemImageSlide.bind(this);
    this.handleDecrementCartItemImageSlide =
      this.handleDecrementCartItemImageSlide.bind(this);
  }

  handleIncrementCartItemImageSlide(images) {
    if (this.state.cartItemImageIndex === images.length - 1) {
      return this.setState({ cartItemImageIndex: 0 });
    }

    return this.setState({
      cartItemImageIndex: this.state.cartItemImageIndex + 1,
    });
  }

  handleDecrementCartItemImageSlide(images) {
    if (this.state.cartItemImageIndex === 0) {
      return this.setState({ cartItemImageIndex: images.length - 1 });
    }

    return this.setState({
      cartItemImageIndex: this.state.cartItemImageIndex - 1,
    });
  }

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
      <Fragment>
        <APIContext.Consumer>
          {({
            currentCurrency,
            handleIncrement,
            handleDecrement,
            handleDisplayProductPrice,
          }) => {
            return (
              <div className="cart-item">
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
                  {gallery.map(
                    (image, index) =>
                      this.state.cartItemImageIndex === index && (
                        <div className="cart-item-image">
                          {gallery.length > 1 && (
                            <button
                              onClick={() =>
                                this.handleDecrementCartItemImageSlide(gallery)
                              }
                              className="cart-item-image-decrement"
                            >
                              {'<'}
                            </button>
                          )}
                          <img src={image} alt="cart item" />
                          {gallery.length > 1 && (
                            <button
                              onClick={() =>
                                this.handleIncrementCartItemImageSlide(gallery)
                              }
                              className="cart-item-image-increment"
                            >
                              {'>'}
                            </button>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            );
          }}
        </APIContext.Consumer>
      </Fragment>
    );
  }
}
