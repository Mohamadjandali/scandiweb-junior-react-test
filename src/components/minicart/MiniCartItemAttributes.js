import React, { Component, Fragment } from 'react';

export default class MiniCartItemAttributes extends Component {
  render() {
    const {
      attribute: { name, items },
      handleActiveAttribute,
      handleCartItemAttributes,
      productId,
    } = this.props;
    return (
      <Fragment>
        {name === 'Color' ? (
          <div className="attribute-container">
            <span>{name}</span>
            <ul className="colors-list">
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
          <div className="attribute-container">
            <span>{name}</span>
            <ul className="attribute-values">
              {items.map((item) => (
                <li
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
                      ? 'active-attribute'
                      : 'unactive-attribute'
                  }
                  key={item.id}
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
