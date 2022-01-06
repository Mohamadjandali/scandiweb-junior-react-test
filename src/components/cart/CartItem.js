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

  handleGetAttributes(id) {
    const foundAttributes = this.props.cartItemAttributes.slice();
    const tes = foundAttributes.find((item) => {
      return item.productId === id;
    });

    return tes ? tes.attributes : false;
  }

  render() {
    const {
      product: { name, prices, gallery, brand, quantity, id, attributes },
    } = this.props;
    return (
      <Fragment>
        <APIContext.Consumer>
          {({
            currentCurrency,
            handleIncrement,
            handleDecrement,
            handleDisplayProductPrice,
            handleActiveAttribute,
            handleCartItemAttributes,
          }) => {
            return (
              <div className="cart-item">
                <div className="cart-item-info">
                  <div>
                    <h2 className="cart-item-brand">{brand}</h2>
                    <h2 className="cart-item-name">{name}</h2>
                  </div>
                  <h3 className="product-price">
                    {currencyIcons(currentCurrency)}
                    {handleDisplayProductPrice(prices, currentCurrency)}
                  </h3>
                  {attributes.map((attribute, index) => (
                    <CartItemAttributes
                      key={index}
                      productId={id}
                      attribute={attribute}
                      cartItemName={name}
                      handleActiveAttribute={handleActiveAttribute}
                      handleCartItemAttributes={handleCartItemAttributes}
                    />
                  ))}
                </div>
                <div className="cart-count">
                  <div className="cart-item-counter">
                    <button
                      className="increment"
                      onClick={() => handleIncrement(id)}
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
                  {gallery.map(
                    (image, index) =>
                      this.state.cartItemImageIndex === index && (
                        <div key={index} className="cart-item-image">
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
