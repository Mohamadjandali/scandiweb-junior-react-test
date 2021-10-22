import React, { Component } from 'react'
import { APIContext } from '../../Context'
import './minicart.css'

export default class MiniCart extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='mini-cart-list'>
                    <APIContext.Consumer>
                        {({ cart }) => {
                            return cart.length ? 
                                cart.map((item) => (
                                    <div className='mini-cart-item'>
                                        <div className='mini-cart-item-info'>
                                            <div className='item-desc'>
                                                <p className='item-name'>{item.name}</p>
                                                <span>{item.price}</span>
                                            </div>
                                            <div>
                                                <span className='item-size'>S</span>
                                            </div>
                                        </div>
                                        <div className='mini-cart-item-counter'>
                                            <span className='increment'>+</span>
                                            <span className='item-count'>2</span>
                                            <span className='decrement'>-</span>
                                        </div>
                                        <div className='mini-cart-item-image'>
                                            <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000' />
                                        </div>
                                    </div>
                                ))
                            :
                                <h3 className='empty-mini-cart'>Your Bag is empty</h3>
                        }}
                    </APIContext.Consumer>
                    <div className='total-price'>
                        <span>Total:</span>
                        <span>$100</span>
                    </div>
                    <div className='cart-control'>
                        <button className='btn-bag'>VIEW BAG</button>
                        <button className='checkout'>CHECK OUT</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
