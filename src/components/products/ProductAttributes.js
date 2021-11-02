import React, { Component } from 'react';

export default class ProductAttributes extends Component {

  render() {
    const { attribute: { name, items }, handleProductAttributes, productAttributes } = this.props;
    return (
      <li className="product-attribute-items">
        <span className="attribute-name">{name}:</span>
        <div className="attributes">
          {items.map((item) => {
            return (
              <span
                onClick={() => handleProductAttributes(name, item.value)}
                // className={`attribute-id ${
                //   productAttributes.find((attr) => attr.id === item.id) ? 'activated-attribute' : ''
                // }`}
                key={item.id}
              >
                {item.value}
              </span>
            );
          })}
        </div>
      </li>
    );
  }
}
