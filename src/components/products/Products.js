import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import './products.css';

export default class Products extends Component {
  handleProductOutput(
    { name, id, gallery, category, prices, inStock, brand },
    selectedCategory,
    currency
  ) {
    return (
      category === selectedCategory && (
        <li className="list-product-item" key={id}>
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
                {this.handleProductPriceOutput(prices, currency)}
              </div>
            </div>
          </Link>
        </li>
      )
    );
  }

  handleProductPriceOutput(availableCurrencies, selectedCurrency) {
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
      <div className="products-list">
        <APIContext.Consumer>
          {({ products, currentCurrency, err }) => {
            return (
              <React.Fragment>
                {products &&
                  products.map((product) =>
                    this.handleProductOutput(product, category, currentCurrency)
                  )}
                {err && <h3>{err}</h3>}
              </React.Fragment>
            );
          }}
        </APIContext.Consumer>
      </div>
    );
  }
}
