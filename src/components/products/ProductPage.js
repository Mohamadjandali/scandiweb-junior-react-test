import React, { Component } from 'react';
import doAPIRequest from '../../request';
import { APIContext } from '../../Context';
import ProductAttributes from './ProductAttributes';
import parse from 'html-react-parser';
import './productpage.css';

export default class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      productImageIndex: 0,
    };
    this.handleProductDisplay = this.handleProductDisplay.bind(this);
    this.displayProductPrice = this.displayProductPrice.bind(this);
    this.displayProductImages = this.displayProductImages.bind(this);
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

  handleProductDisplay({
    name,
    brand,
    description,
    gallery,
    attributes,
    prices,
    inStock,
  }) {
    return (
      <APIContext.Consumer>
        {({ currentCurrency, setCart }) => {
          return (
            <div className="product-container">
              <div className="images-list">
                {gallery.map((image, index) =>
                  this.displayProductImages(image, index)
                )}
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
                  {attributes.map((attribute) =>
                    <ProductAttributes attribute={attribute} />
                  )}
                </div>
                <div className="product-price">
                  {this.displayProductPrice(prices, currentCurrency)}
                </div>
                <div className="add-product">
                  { inStock ? 
                    <button onClick={() => setCart(this.state.product)}>
                      ADD TO CART
                    </button>
                    :
                    <h3>This product is out of stock</h3>
                  }
                </div>
                <div className="product-description">
                  {/* Parsing the desciption */}
                  {parse(description)}
                </div>
              </div>
            </div>
          );
        }}
      </APIContext.Consumer>
    );
  }

  displayProductPrice(availablePrices, selectedCurrency) {
    // checking the current selected currency and finding the right price based on the currency
    const productPrice = availablePrices.find((price) => {
      return price.price === selectedCurrency;
    });

    return <span>{productPrice}</span>;
  }

  displayProductImages(image, imageIndex) {
    return (
      <div onClick={() => this.setState({ productImageIndex: imageIndex })}>
        <img src={image} alt="product-image" />
      </div>
    );
  }

  render() {
    return this.state.product && this.handleProductDisplay(this.state.product);
  }
}
