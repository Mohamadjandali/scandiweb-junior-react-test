import React, { Component, Fragment } from 'react';

export default class CartItemAttributes extends Component {
  render() {
    const {
      attribute: { name, items },
      productId,
      handleActiveAttribute,
      handleCartItemAttributes,
    } = this.props;
    return (
      <Fragment>
        {name === 'Color' ? (
          <div className="attribute">
            <span className="cart-attribute-name">{name}:</span>
            <ul className="cart-colors-list">
              {items.map((color) => (
                <li
                  key={color.id}
                  onClick={() =>
                    handleCartItemAttributes(
                      productId,
                      name,
                      color.value,
                      color.id
                    )
                  }
                  className={
                    handleActiveAttribute(productId, name, color.value)
                      ? 'active-color'
                      : 'unactive-color'
                  }
                  style={{ backgroundColor: color.value }}
                ></li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="cart-attribute">
            <h3 className="cart-attribute-name">{name}</h3>
            <ul className="cart-attribute-values">
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() =>
                    handleCartItemAttributes(
                      productId,
                      name,
                      item.value,
                      item.id
                    )
                  }
                  className={
                    handleActiveAttribute(productId, name, item.value)
                      ? 'active-cart-attribute'
                      : 'unactive-cart-attribute'
                  }
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Fragment>
    );
  }
}
