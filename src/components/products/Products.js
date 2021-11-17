import React, { Component, Fragment } from 'react';
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
      err: null,
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.handleFetchCategory(category);
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params;
    const { params } = prevProps.match;

    if (params.category !== category) {
      return this.handleFetchCategory(category);
    }

    return;
  }

  async handleFetchCategory(categoryName) {
    const [data, error] = await doAPIRequest(
      `
        query {
          category(input: {title: "${categoryName}"}) {
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
      `
    );

    if (error) {
      console.log(error.message);
      return this.setState({ err: error.message });
    }

    const { name } = data.data.category;

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
          <div className="cart-btn" onClick={() => addProductToCart(product)}>
            <FontAwesomeIcon className="cart-svg" icon={faShoppingCart} />
          </div>
        )}
      </li>
    );
  }

  handleProductPriceDisplay(availableCurrencies, selectedCurrency) {
    const productPrice = availableCurrencies.find(({ currency }) => {
      return currency === selectedCurrency;
    });

    return (
      <div className="product-amount">
        <span>{currencyIcons(selectedCurrency)}</span>
        <span>{productPrice.amount}</span>
      </div>
    );
  }

  render() {
    const { products, err } = this.state;
    return (
      <APIContext.Consumer>
        {({ currentCurrency, handleAddProductToCart }) => {
          return (
            <Fragment>
              {products && (
                <ul className="products-list">
                  {products.map((product) =>
                    this.handleProductDisplay(
                      product,
                      currentCurrency,
                      handleAddProductToCart
                    )
                  )}
                </ul>
              )}
              {err && <h3>{err}</h3>}
            </Fragment>
          );
        }}
      </APIContext.Consumer>
    );
  }
}
