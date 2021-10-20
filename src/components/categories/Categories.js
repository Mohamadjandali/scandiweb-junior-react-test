import React, { Component } from 'react'
import { APIContext } from '../../Context'
import './categories.css'

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: 0
        }
        this.handleClass = this.handleClass.bind(this);
    }

    handleClass(currentIndex) {
        this.setState({ toggle: currentIndex})
    }

    render() {
        return (
            <div className='categories-list'>
                <APIContext.Consumer>
                    {({ categories }) => {
                        return categories.map((category, index) => (
                            <span 
                            key={category.name}
                            className={this.state.toggle === index ? 'underline-overlay' : ''}
                            onClick={() => this.handleClass(index)}>
                                <li>
                                    {category.name}
                                </li>
                            </span>
                        )) 
                    }}
                </APIContext.Consumer>
            </div>
        );
    }
}
