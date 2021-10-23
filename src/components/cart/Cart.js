import React, { Component } from 'react'
import { APIContext } from '../../Context'

export default class Cart extends Component {
    render() {
        return (
            <ul>
                <APIContext.Consumer>
                    {({ cart }) => {
                        return cart.map((item) => (
                            <li>
                                <div>
                                    <h2>{item.name}</h2>
                                    <span>{item.price}</span>
                                    <img src='https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg' />
                                </div>
                            </li>
                        ))
                    }}
                </APIContext.Consumer>
            </ul>
        )
    }
}
