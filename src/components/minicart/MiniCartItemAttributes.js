import React, { Component } from 'react';

export default class MiniCartItemAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemAttribute: null,
    };
    this.handleActiveAttribute = this.handleActiveAttribute.bind(this);
  }

  handleActiveAttribute(attributeIndex) {
    return this.setState({ cartItemAttribute: attributeIndex });
  }

  render() {
    const {
      attribute: { name, items },
    } = this.props;
    return (
      <div className="cart-item-attributes">
        <span className="cart-item-attribute-name">{name}:</span>
        <ul className="cart-item-attribute-items">
          {name === 'Color'
            ? items.map((item, index) => (
                <li
                  key={index}
                  className={
                    this.state.cartItemAttribute === index
                      ? 'active-color'
                      : 'unactive-color'
                  }
                  onClick={() => this.handleActiveAttribute(index)}
                  style={{ backgroundColor: item.value }}
                ></li>
              ))
            : items.map((item, index) => (
                <li
                  key={index}
                  className={
                    this.state.cartItemAttribute === index ? 'activated' : ''
                  }
                  onClick={() => this.handleActiveAttribute(index)}
                >
                  {item.value}
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
