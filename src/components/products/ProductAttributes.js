import React, { Component } from 'react';

export default class ProductAttributes extends Component {
  constructor() {
    super();
    this.state = {
      attributeValue: null,
    };
  }

  render() {
    return (
      <li className="product-attribute-items">
        <span className="attribute-name">{this.props.attribute.name}:</span>
        <div className="attributes">
          {this.props.attribute.items.map(({ id, value }) => {
            return (
              <span
                onClick={() => this.setState({ attributeValue: id })}
                className={`attribute-id ${
                  this.state.attributeValue === id ? 'activated-attribute' : ''
                }`}
                key={id}
              >
                {value}
              </span>
            );
          })}
        </div>
      </li>
    );
  }
}
