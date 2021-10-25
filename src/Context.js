import React, { Component, createContext } from 'react';
import doAPIRequest from './request';

export const APIContext = createContext();

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      currencies: [],
      cart: [],
      currentCurrency: 'USD',
    };
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
  }

  async componentDidMount() {
    const [data, error] = await doAPIRequest(
      'http://localhost:4000',
      'POST',
      { 'Content-Type': 'application/json' },
      {
        query: `
          query {
            categories {
                name,
                products {
                  id,
                  name,
                  inStock,
                  description,
                  category,
                  brand,
                  gallery,
                  prices {
                    currency,
                    amount
                  }
                }
            }
            currencies
          }
        `,
      }
    );

    if (error) {
      return console.log(error);
    }

    console.log(data);

    let productsArray = data.data.categories.map((category) => {
      return category.products;
    });
    let allProducts = productsArray[0].concat(productsArray[1]);

    this.setState({
      categories: data.data.categories,
      products: allProducts,
      currencies: data.data.currencies,
    });
  }

  handleAddItemToCart(item) {
    this.setState((prevState) => {
      return {
        cart: [item, ...prevState.cart]
      }
    })

    return console.log(this.state.cart);
  }

  render() {
    return (
      <APIContext.Provider
        value={{
          categories: this.state.categories,
          products: this.state.products,
          currencies: this.state.currencies,
          currentCurrency: this.state.currentCurrency,
          setCurrency: (currency) =>
            this.setState({ currentCurrency: currency }),
          cart: this.state.cart,
          setCart: this.handleAddItemToCart
        }}
      >
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
