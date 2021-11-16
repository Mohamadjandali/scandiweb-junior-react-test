import React, { Component, Fragment } from 'react';
import doAPIRequest from '../../request';
import { APIContext } from '../../Context';
import ProductAttributes from './ProductAttributes';
import parse from 'html-react-parser';
import currencyIcons from '../navbar/CurrencyIcons';
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
    const { productId } = this.props.match.params;
    const [data, error] = await doAPIRequest(
      `
        query {
          product(id: "${productId}") {
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
      `
    );

    if (error) {
      return this.setState({ err: error.message });
    }

    const { product } = data.data;

    this.setState({
      product: product,
      productAttributes: product.attributes,
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
          handleAddProductToCart,
          handleDisplayProductPrice,
        }) => {
          return (
            <div className="product-page-container">
              <div className="product-container">
                <div className="product-images-list">
                  {gallery.map((image, index) =>
                    this.displayProductImages(image, index)
                  )}
                </div>
                <div className="product-image-container">
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
                  <div className="product-attributes">
                    {attributes.map((attribute, index) => (
                      <ProductAttributes
                        handleProductAttributes={this.handleProductAttributes}
                        productAttributes={this.state.productAttributes}
                        key={index}
                        attribute={attribute}
                      />
                    ))}
                  </div>
                  <div className="product-price">
                    <h3>Price:</h3>
                    <h3>
                      <span>{currencyIcons(currentCurrency)}</span>
                      {handleDisplayProductPrice(prices, currentCurrency)}
                    </h3>
                  </div>
                  <div className="add-product">
                    {inStock ? (
                      <button
                        onClick={() =>
                          handleAddProductToCart(
                            this.state.product,
                            this.state.product.attributes
                          )
                        }
                      >
                        ADD TO CART
                      </button>
                    ) : (
                      <h3>This product is out of stock</h3>
                    )}
                  </div>
                  <div>
                    <ul className="description-list">
                      {parse(description.replace(/h3/g, 'li'))}
                    </ul>
                  </div>
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
        className="product-image-item"
        key={imageIndex}
        onClick={() => this.setState({ productImageIndex: imageIndex })}
      >
        <img src={image} alt="product" />
      </div>
    );
  }

  handleProductAttributes(attributeName, attributeValue) {
    this.setState(
      (prevState) => {
        return {
          productAttributes: prevState.productAttributes.map((attribute) => {
            return attribute.name === attributeName
              ? { name: attribute.name, value: attributeValue }
              : attribute;
          }),
        };
      },
      () => console.log(this.state.productAttributes)
    );
  }

  render() {
    const { product, err } = this.state;
    return (
      <Fragment>
        {product && this.handleProductDisplay(product)}
        {err && <h3>{err}</h3>}
      </Fragment>
    );
  }
}
