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
                                <a href={category.name}>
                                    {category.name}
                                </a>
                            </li>
                        )) 
                    }}
                </APIContext.Consumer>
            </ul>
        );
    }
}
