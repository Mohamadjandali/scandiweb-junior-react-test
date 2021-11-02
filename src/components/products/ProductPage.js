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
      productAttributes: [],
      productImageIndex: 0,
      err: null,
    };
    this.handleProductDisplay = this.handleProductDisplay.bind(this);
    this.displayProductImages = this.displayProductImages.bind(this);
    this.handleProductAttributes = this.handleProductAttributes.bind(this);
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
      return this.setState({ err: error.message });
    }

    this.setState({
      product: data.data.product,
      productAttributes: data.data.product.attributes,
    });
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
        {({
          currentCurrency,
          handleAddItemToCart,
          handleDisplayProductPrice,
        }) => {
          return (
            <div className="product-container">
              <div className="images-list">
                {gallery.map((image, index) =>
                  this.displayProductImages(image, index)
                )}
              </div>
              <div className="image-container">
                <img
                  src={gallery[this.state.productImageIndex]}
                  alt="product"
                />
              </div>
              <div className="product-status">
                <div className="product-info">
                  <h2>{brand}</h2>
                  <h3>{name}</h3>
                </div>
                <ul className="product-attributes">
                  {attributes.map((attribute) => (
                    <ProductAttributes
                      handleProductAttributes={this.handleProductAttributes}
                      productAttributes={this.state.productAttributes}
                      key={attribute.id}
                      attribute={attribute}
                    />
                  ))}
                </ul>
                <div className="product-price">
                  <h3>Price:</h3>
                  <h3>{handleDisplayProductPrice(prices, currentCurrency)}</h3>
                </div>
                <div className="add-product">
                  {inStock ? (
                    <button
                      onClick={() =>
                        handleAddItemToCart(
                          this.state.product,
                          this.state.productAttributes
                        )
                      }
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <h3>This product is out of stock</h3>
                  )}
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

  displayProductImages(image, imageIndex) {
    return (
      <div
        key={imageIndex}
        onClick={() => this.setState({ productImageIndex: imageIndex })}
      >
        <img src={image} alt="product" />
      </div>
    );
  }

  handleProductAttributes(attributeName, attributeValue) {
    this.setState((prevState) => {
      return {
        productAttributes: prevState.productAttributes.map((attribute) => {
          return attribute.name === attributeName
            ? { name: attribute.name, item: attributeValue }
            : attribute;
        }),
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.product && this.handleProductDisplay(this.state.product)}
        {this.state.err && <h3>{this.state.err}</h3>}
      </React.Fragment>
    );
  }
}
