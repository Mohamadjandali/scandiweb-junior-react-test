import React, { Component } from 'react';

export default class MiniCartItemAttributes extends Component {

  render() {
    const { attribute: { name, value } } = this.props;
    return (
      <div className="minicart-item-attributes">
        {name === 'Color' ?
          <div className="attribute">
            <span>{name}:</span> <span className="active-color" style={{ backgroundColor: value }}></span>
          </div>
          :
          <div className="attribute">
            {name}: <span className="mini-cart-attribute-activated">{value}</span>
          </div>
        }
      </div>
    );
  }
}