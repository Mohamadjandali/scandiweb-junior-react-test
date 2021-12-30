import React, { Component } from 'react';

export default class MiniCartItemAttributes extends Component {
  render() {
    const {
      attribute: { name, items },
    } = this.props;
    return (
      <div className="attribute-container">
        <span>{name}</span>
        <div>
          <ul className="attribute-values">
            {items.map((item) => (
              <li key={item.id}>{item.value}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
