import React, { Component } from 'react'
import { createContext } from 'react/cjs/react.development';

export const APIContext = createContext();

export default class Context extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    render() {
        return (
            <APIContext.Provider value={{ data: this.state.data }}>
                {this.props.children}
            </APIContext.Provider>
        )
    }
}
