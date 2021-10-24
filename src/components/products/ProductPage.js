import React, { Component } from 'react';
import doAPIRequest from '../../request';
import { APIContext } from '../../Context';
import parse from 'html-react-parser';
import './productpage.css';

export default class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      productImageIndex: 0
    };
    this.handleProductDisplay = this.handleProductDisplay.bind(this);
  }

  async componentDidMount() {
    const [data, error] = await doAPIRequest(
      'http://localhost:4000',
      'POST',
      { 'Content-Type': 'application/json' },
      {
        query: `
          query {
            product(id: "${this.props.match.params.productId}") {
              id,
              name,
              inStock,
              gallery,
              category,
              brand
              description,
              prices {
                currency,
                amount
              },
              attributes {
                id,
                name
                type,
                items {
                  displayValue,
                  value,
                  id
                }
              }
            }
          }
        `,
      }
    );

    if (error) {
      return console.log(error);
    }

    this.setState({ product: data.data.product });
  }

  handleProductDisplay({ name, brand, description, gallery, attributes, prices }) {
    return (
      <div className="product-container">
        <div className="images-list">
          {gallery.map((image, index) => (
            <div onClick={() => this.setState({ productImageIndex: index })}>
              <img src={image} alt="product-image" />
            </div>
          ))}
        </div>
        <div className="image-container">
          <img src={gallery[this.state.productImageIndex]} />
        </div>
        <div className="product-status">
          <div className="product-info">
            <h2>{brand}</h2>
            <h3>{name}</h3>
          </div>
          <div className="product-attributes">
            {attributes.map(({ id, name, items }) => {
              return (
                <li className="product-attribute-items" key={id}>
                  <span className="attribute-name">{name}:</span>
                  <div className="attributes">
                    {items.map(({ id, value }) => {
                      return (
                        <span className="attribute-id" key={id}>
                          {value}
                        </span>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </div>
          <div className="product-price">
            <APIContext.Consumer>
              {({ currentCurrency }) => {
                // formattig the price based on the selected currency
                const productPrice = prices.find((price) => {
                  return price.currency === currentCurrency;
                })
                return <span>{productPrice.amount} {currentCurrency}</span>
              }}
            </APIContext.Consumer>
          </div>
          <div className="add-product">
            <button>ADD TO CART</button>
          </div>
          <div className="product-description">
            {/* Parsing the desciption */}
            {parse(description)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.product && this.handleProductDisplay(this.state.product);
  }
}
