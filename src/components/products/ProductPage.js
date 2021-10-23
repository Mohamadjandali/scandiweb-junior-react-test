import React, { Component } from 'react';
import doAPIRequest from '../../request';

export default class ProductPage extends Component {

    async componentDidMount() {
        const [data, error] = await doAPIRequest(
            'http://localhost:4000',
            'POST',
            { 'Content-Type': 'application/json' },
            {
                query: `
                    query {
                        product(id: "${this.props.match.params.productId}") {
                        id,
                        name,
                        inStock
                        } 
                    }
                `
            }
        );

        if (error) {
            return console.log(error)
        }

        console.log(data);
    }

    render() {
        return (
            <div>
                Product
            </div>
        )
    }
}
