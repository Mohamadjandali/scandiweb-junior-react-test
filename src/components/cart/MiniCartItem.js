import React, { Component } from 'react'
import { APIContext } from '../../Context';

export default class MiniCartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
    }

    handleProductPrice(availableCurrencies, selectedCurrency) {
        const productPrice = availableCurrencies.find((currency) => {
          return currency.currency === selectedCurrency;
        });
    
        return `${Math.round(productPrice.amount) * this.state.quantity} ${productPrice.currency}`;
      }

    render() {
        const { product: { name, brand, gallery, prices }, currentCurrency } = this.props;
        return (
            <React.Fragment>
                <div className="mini-cart-item">
                    <div className="mini-cart-item-info">
                        <div className="item-desc">
                            <p>{brand}</p>
                            <p className="item-name">{name}</p>
                        </div>
                        <span className="mini-cart-item-price">
                            {this.handleProductPrice(prices, currentCurrency)}
                        </span>
                        <div>
                            <span className="item-size">S</span>
                        </div>
                    </div>
                    <div className="mini-cart-item-counter">
                        <APIContext.Consumer>
                            {({ handleIncrement }) => {
                                return (
                                    <button 
                                    onClick={() => handleIncrement(name)}
                                    className="increment">
                                    +
                                    </button>
                                )
                            }}
                        </APIContext.Consumer>
                        <span className="item-count">{this.props.quantity}</span>
                        <button 
                            className="decrement"
                            onClick={() => this.setState({ quantity: this.state.quantity - 1 })}
                            disabled={this.state.quantity === 1}
                        >-</button>
                    </div>
                    <div className="mini-cart-item-image">
                        <img src={gallery} alt="product" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
