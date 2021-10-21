import React, { Component } from 'react'
import { APIContext } from '../../Context'

export default class Products extends Component {

    handleProductOutput({ name, id, gallery, category, prices}, selectedCategory, currency) {
        return category === selectedCategory && 
            <li key={id}>
                <div>
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
        return (
            <ul>
                <APIContext.Consumer>
                    {({ products, currentCurrency }) => {
                        return products.map((product) => this.handleProductOutput(product, 'tech', currentCurrency))
                    }}
               </APIContext.Consumer>
            </ul>
        )
    }
}
