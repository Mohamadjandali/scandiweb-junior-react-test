import React, { Component } from 'react'
import { APIContext } from '../../Context'
import './currencies.css'

export default class Currencies extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <ul className={this.props.toggleCurrency ? 'currencies-list' : 'hide'}>
                    <APIContext.Consumer>
                        {({ currencies }) => {
                            return currencies.map((currency) => (        
                                <li key={currency} >{currency}</li>                    
                            ))
                        }}
                    </APIContext.Consumer>
                </ul>
            </React.Fragment>
        )
    }
}
