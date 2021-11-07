import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import './products.css';

export default class Products extends Component {
  handleProductDisplay(
    { name, id, gallery, category, prices, inStock, brand },
    selectedCategory,
    currency
  ) {
    return (
      category === selectedCategory && (
        <li className="products-item" key={id}>
          <Link to={`/${category}/${id}`}>
            <div className={`product ${inStock ? '' : 'unavailable-product'}`}>
              {inStock ? (
                ''
              ) : (
                <span className="out-of-stock">Out of stock</span>
              )}
              <img src={gallery[0]} />
              <div>
                <span>{`${brand} ${name}`}</span>
                {this.handleProductPriceDisplay(prices, currency)}
              </div>
            </div>
          </Link>
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
    )
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
                    this.handleProductDisplay(product, category, currentCurrency)
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
