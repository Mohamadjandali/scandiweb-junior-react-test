import React, { Component } from 'react';
import { APIContext } from '../../Context';

export default class MiniCartItemAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemAttribute: null,
    };
    this.handleActiveAttribute = this.handleActiveAttribute.bind(this);
  }

  handleActiveAttribute() {}

  render() {
    const {
      attribute: { name, items },
      cartItemId,
    } = this.props;
    return (
      <APIContext.Consumer>
        {({ handleCartItemAttributes, cartItemAttributes }) => {
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
                          cartItemAttributes.find((attribute) =>
                            attribute.attributes.find(
                              (attr) =>
                                attr.value === item.value && attr.name === name
                            )
                          )
                            ? 'activated'
                            : ''
                        }
                        onClick={() =>
                          handleCartItemAttributes(cartItemId, name, item.value)
                        }
                      >
                        {item.value}
                      </li>
                    ))}
              </ul>
            </div>
          );
        }}
      </APIContext.Consumer>
    );
  }
}
