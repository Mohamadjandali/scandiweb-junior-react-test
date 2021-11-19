import React, { Component } from 'react';
import { APIContext } from '../../Context';

export default class CartItemAttributes extends Component {
  render() {
    const {
      attribute: { name, items },
      cartItemId,
    } = this.props;
    return (
      <APIContext.Consumer>
        {({ handleCartItemAttributes, cartItemAttributes }) => {
          return (
            <div className="cart-item-attribute">
              <span className="cart-item-attribute-name">{name}:</span>
              <ul className="cart-item-attribute-items">
                {name === 'Color'
                  ? items.map((item, index) => (
                      <li
                        key={index}
                        className={
                          cartItemAttributes.find((attribute) =>
                            attribute.attributes.find(
                              (attr) =>
                                attr.value === item.value && attr.name === name
                            )
                          )
                            ? 'active-color'
                            : 'unactive-color'
                        }
                        onClick={() =>
                          handleCartItemAttributes(cartItemId, name, item.value)
                        }
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
                            : 'unactivated'
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
