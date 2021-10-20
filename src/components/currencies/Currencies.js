import React, { Component } from 'react'
import { APIContext } from '../../Context'

export default class Currencies extends Component {
    render() {
        return (
            <React.Fragment>
                <ul>
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
