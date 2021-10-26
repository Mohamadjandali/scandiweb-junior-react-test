import React, { Component } from 'react'

export default class MiniCartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
    }

    render() {
        const { name, brand, gallery, price } = this.props.product;
        return (
            <React.Fragment>
                <div className="mini-cart-item">
                    <div className="mini-cart-item-info">
                        <div className="item-desc">
                            <p>{brand}</p>
                            <p className="item-name">{name}</p>
                            <span>{price}</span>
                        </div>
                        <div>
                            <span className="item-size">S</span>
                        </div>
                    </div>
                    <div className="mini-cart-item-counter">
                        <button 
                            className="increment"
                            onClick={() => this.setState({ quantity: this.state.quantity + 1 })}
                        >+</button>
                        <span className="item-count">{this.state.quantity}</span>
                        <button 
                            className="decrement"
                            onClick={() => this.setState({ quantity: this.state.quantity - 1 })}
                            disabled={this.state.quantity === 1}
                        >-</button>
                    </div>
                    <div className="mini-cart-item-image">
                        <img src={gallery} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
