import React, { Component } from 'react'

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quantity: 1
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="cart-item">
                  <div className="cart-item-info">
                    <div>
                      <h2>{this.props.product.name}</h2>
                      <h2>{this.props.product.price}</h2>
                    </div>
                  </div>
                  <div className="cart-count">
                    <div className="cart-item-counter">
                      <button 
                        className="increment"
                        onClick={() => this.setState({ quantity: this.state.quantity + 1 })}>+</button>
                      <span className="item-count">{this.state.quantity}</span>
                      <button 
                        className="decrement"
                        onClick={() => this.setState({ quantity: this.state.quantity - 1 })}
                        disabled={this.state.quantity === 1}
                        >-</button>
                    </div>
                    <div>
                      <img src={this.props.product.gallery} />
                    </div>
                  </div>
                </div>
              </React.Fragment>
        )
    }
}
