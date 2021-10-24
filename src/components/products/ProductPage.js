import React, { Component } from 'react';
import doAPIRequest from '../../request';
import './productpage.css';

export default class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
    };
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
    console.log(data);

    console.log(this.state.product)
  }

  render() {
    if (this.state.product !== null) console.log(this.state.product.description)
    return this.state.product && (
      <div className="product-container">
        <div className="images-list">
          {this.state.product.gallery.map((image) => <img src={image} alt='product-image' /> )}
        </div> 
        <div className="image-container">
          <img src={this.state.product.gallery[0]} />
        </div>
        <div className="product-status">
          <div className="product-info">
            <h2>{this.state.product.brand}</h2>
            <h3>{this.state.product.name}</h3>
          </div>
          <div className="product-attributes">
            { this.state.product.attributes.map(({ id, name, items }) => {
              return (
                <li 
                  className="product-attribute-items"
                  key={id}>
                  <span className="attribute-name">{name}:</span>
                  <div className="attributes">
                    { items.map(({ id, value }) => {
                      return <span 
                        className="attribute-id" 
                        key={id}>{value}</span>
                      })  
                    }
                  </div>
                </li>
              )
            }) }
          </div>
          <div className="add-product">
            <button>ADD TO CART</button>
          </div>
          <div className="product-description">
            {this.state.product.description}
          </div>
        </div> 
      </div>
    )
  }
}
