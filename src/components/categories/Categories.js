import React, { Component } from 'react'

import { APIContext } from '../../Context'

export default class Categories extends Component {
    render() {
        return (
            <ul>
                <APIContext.Consumer>
                    {(categories) => {
                        return categories.map(category => (
                            <li key={category.name}>
                                <h1>{category.name}</h1>
                            </li>
                        )) 
                    }}
                </APIContext.Consumer>
            </ul>
        );
    }
}
