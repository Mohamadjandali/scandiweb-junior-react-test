import React, { Component } from 'react'

export default class ProductPage extends Component {
    render() {
        console.log(this.props.match);
        return (
            <div>
                Product
            </div>
        )
    }
}
