import React, { Component } from 'react'
import { APIContext } from '../../Context'
import './minicart.css'

export default class MiniCart extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='overlay'></div>
                <div className='cart-list'>
                    <APIContext.Consumer>
                        {({ cart }) => {
                            return cart.length ? 
                                cart.map((item) => (
                                    <div className='cart-item'>
                                        <div className='cart-item-info'>
                                            <div className='item-desc'>
                                                <h5>{item.name}</h5>
                                                <span>{item.price}</span>
                                            </div>
                                            <div>
                                                <span className='item-size'>S</span>
                                            </div>
                                        </div>
                                        <div className='cart-item-counter'>
                                            <span className='increment'>+</span>
                                            <span className='item-count'>2</span>
                                            <span className='decrement'>-</span>
                                        </div>
                                        <div className='cart-item-image'>
                                            <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000' />
                                        </div>
                                    </div>
                                ))
                            :
                                <span>Add a product to your cart</span>
                        }}
                    </APIContext.Consumer>
                </div>
            </React.Fragment>
        )
    }
}
