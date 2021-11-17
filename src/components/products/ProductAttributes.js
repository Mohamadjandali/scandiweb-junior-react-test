import React, { Component } from 'react';

export default class ProductAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeIndex: null,
    };
  }

  render() {
    const {
      productId,
      attribute: { name, items },
      handleProductAttributes,
    } = this.props;
    return (
      <div className="attributes-container">
        <span className="attribute-name">{name}:</span>
        <ul className="attributes-list">
          {items.map((item, index) => {
            return (
              <li
                onClick={() => {
                  handleProductAttributes(productId, name, item.value);
                  return this.setState({ attributeIndex: index });
                }}
                style={name === 'Color' ? { backgroundColor: item.id } : {}}
                className={
                  this.state.attributeIndex === index
                    ? 'activated-attribute'
                    : 'attribute'
                }
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
