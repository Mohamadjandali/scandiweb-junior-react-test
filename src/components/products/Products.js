import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './products.css';

export default class Products extends Component {
  handleProductDisplay(
    { name, id, gallery, category, prices, inStock, brand },
    selectedCategory,
    currency
  ) {
    return (
      category === selectedCategory && (
        <li
          key={id}
          className={`products-item ${inStock ? '' : 'unavailable-product'}`}
        >
          <Link to={`/${category}/${id}`}>
            {!inStock && <span className="out-of-stock">Out of stock</span>}
            <div className="product-image">
              <img src={gallery[0]} />
            </div>
            <div>
              <span>{`${brand} ${name}`}</span>
              {this.handleProductPriceDisplay(prices, currency)}
            </div>
          </Link>
          {inStock && (
            <div className="cart-btn" onClick={() => console.log('hi')}>
              <FontAwesomeIcon className="cart-svg" icon={faShoppingCart} />
            </div>
          )}
        </li>
      )
    );
  }

  handleProductPriceDisplay(availableCurrencies, selectedCurrency) {
    const productPrice = availableCurrencies.find((currency) => {
      return currency.currency === selectedCurrency;
    });

    return (
      <div className="product-amount">
        <span>{currencyIcons(selectedCurrency)}</span>
        <span>{productPrice.amount}</span>
      </div>
    );
  }

  render() {
    const { category } = this.props.match.params;
    return (
      <React.Fragment>
        <APIContext.Consumer>
          {({ products, currentCurrency, err }) => {
            return (
              <ul className="products-list">
                {products &&
                  products.map((product) =>
                    this.handleProductDisplay(
                      product,
                      category,
                      currentCurrency
                    )
                  )}
                {err && <h3>{err}</h3>}
              </ul>
            );
          }}
        </APIContext.Consumer>
      </React.Fragment>
    );
  }
}
