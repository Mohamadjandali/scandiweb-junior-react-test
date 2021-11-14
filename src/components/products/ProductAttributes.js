import React, { Component } from 'react';

export default class ProductAttributes extends Component {
  render() {
    const {
      attribute: { name, items },
      handleProductAttributes,
      productAttributes,
    } = this.props;
    return (
      <div className="attributes-container">
        <span className="attribute-name">{name}:</span>
        <ul className="attributes-list">
          {items.map((item) => {
            return (
              <li
                onClick={() => handleProductAttributes(name, item.value)}
                style={name === 'Color' ? { backgroundColor: item.id } : {}}
                className={`${
                  productAttributes.find(
                    (attr) => attr.value === item.value && attr.name === name
                  )
                    ? 'activated-attribute'
                    : 'attribute'
                }`}
                key={item.id}
              >
                {name === 'Color' ? <div className="color"></div> : item.id}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
