import React, { Component } from 'react'
import { APIContext } from '../../Context'

export default class Products extends Component {

    handleProductOutput({ name, gallery, category, prices: { currency, amount }}, selectedCategory) {
        return category === selectedCategory && 
            <li>
                <div>
                    <img src={gallery[0]} />
                    <h3>{name}</h3>
                    <span></span>
                </div>
            </li>
    }

    render() {
        return (
            <ul>
                <APIContext.Consumer>
                    {({ products }) => {
                        return products.map((product) => this.handleProductOutput(product, 'tech'))
                    }}
               </APIContext.Consumer>
            </ul>
        )
    }
}
