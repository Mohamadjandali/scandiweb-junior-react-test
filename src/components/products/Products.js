import React, { Component } from 'react'
import { APIContext } from '../../Context'
import './products.css'

export default class Products extends Component {

    handleProductOutput({ name, id, gallery, category, prices, inStock}, selectedCategory, currency) {
        return category === selectedCategory && 
            <li key={id}>
                <div className={`product ${inStock ? '' : 'unavailable-product'}`}>
                    {inStock ? '' : <span className='out-of-stock' >Out of stock</span>}
                    <img src={gallery[0]} />
                    <h3>{name}</h3>
                    <span>{this.handleProductPriceOutput(prices, currency)}</span>
                </div>
            </li>
    }

    handleProductPriceOutput(availableCurrencies, selectedCurrency) {
        const productPrice = availableCurrencies.find((currency) => {
            return currency.currency === selectedCurrency
        });
        
        return `${productPrice.amount} ${productPrice.currency}`
    }

    render() {
        const { category } = this.props.match.params;
        return (
            <div className="products-list">
                <APIContext.Consumer>
                    {({ products, currentCurrency }) => {
                        return products.map((product) => this.handleProductOutput(product, category, currentCurrency))
                    }}
               </APIContext.Consumer>
            </div>
        )
    }
}
