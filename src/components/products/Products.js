import React, { Component } from 'react'
import { APIContext } from '../../Context'

export default class Products extends Component {

    handleProduct(product, selectedCategory) {
        return product.category === selectedCategory && <li>{product.name}</li>;
    }

    render() {
        return (
            <ul>
                <APIContext.Consumer>
                    {({ products }) => {
                        return products.map((product) => this.handleProduct(product, 'tech'))
                    }}
               </APIContext.Consumer>
            </ul>
        )
    }
}
