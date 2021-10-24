import { Component } from 'react';
import doAPIRequest from '../../request';
import productPageTemplate from './productPageTemplate';
import './productpage.css';

export default class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
    };
  }

  // send an api request and set the state to the product
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
              inStock,
              gallery,
              category,
              brand
              description,
              prices {
                currency,
                amount
              },
              attributes {
                id,
                name
                type,
                items {
                  displayValue,
                  value,
                  id
                }
              }
            }
          }
        `,
      }
    );

    if (error) {
      return console.log(error);
    }

    this.setState({ product: data.data.product });
  }

  render() {
    // check it the state does not equal to null and call a template function
    return this.state.product && productPageTemplate(this.state.product);
  }
}
