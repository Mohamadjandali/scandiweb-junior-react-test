import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import doAPIRequest from '../../request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './products.css';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { category },
      },
    } = this.props;
    this.handleFetchCategory(category);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { category },
      },
    } = this.props;
    const {
      match: { params },
    } = prevProps;

    if (params.category !== category) {
      return this.handleFetchCategory(category);
    }

    return;
  }

  async handleFetchCategory(category) {
    const [data, error] = await doAPIRequest(
      'http://localhost:4000',
      'POST',
      { 'Content-Type': 'application/json' },
      {
        query: `
          query {
            category(input: {title: "${category}"}) {
              name: ,
              products {
                id,
                name,
                inStock,
                description,
                category,
                brand,
                gallery,
                attributes {
                  id,
                  name
                  type,
                  items {
                    displayValue,
                    value,
                    id,
                  }
                },
                prices {
                  currency,
                  amount
                }
              }
            }
          }
        `,
      }
    );

    if (error) {
      return console.log(error.message);
    }

    const {
      data: {
        category: { name },
      },
    } = data;

    return this.setState({
      products: name,
    });
  }

  handleProductDisplay(product, currency, addProductToCart) {
    const { name, id, gallery, category, prices, inStock, brand, attributes } =
      product;
    return (
      <li
        key={id}
        className={`products-item ${inStock ? '' : 'unavailable-product'}`}
      >
        <Link to={`/${category}/${id}`}>
          {!inStock && <span className="out-of-stock">Out of stock</span>}
          <div className="product-image">
            <img src={gallery[0]} alt="product" />
          </div>
          <div>
            <span>{`${brand} ${name}`}</span>
            {this.handleProductPriceDisplay(prices, currency)}
          </div>
        </Link>
        {inStock && (
          <div
            className="cart-btn"
            onClick={() => addProductToCart(product, attributes)}
          >
            <FontAwesomeIcon className="cart-svg" icon={faShoppingCart} />
          </div>
        )}
      </li>
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
    const { products } = this.state;
    return (
      <React.Fragment>
        <APIContext.Consumer>
          {({ currentCurrency, handleAddProductToCart, err }) => {
            return (
              <ul className="products-list">
                {products &&
                  products.map((product) =>
                    this.handleProductDisplay(
                      product,
                      currentCurrency,
                      handleAddProductToCart
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
