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
      totalPrice: [],
    };
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
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
    // checks if the product is already in cart
    const foundProduct = this.state.cart.find((product) => {
      return product.name === item.name;
    }) 

    if (foundProduct) {
      return alert('this product is already in your cart');
    }
    
    // add a product to the cart
    this.setState((prevState) => {
      return {
        cart: [{ item, quantity: 1}, ...prevState.cart]
      }
    })

    alert(`added ${item.name} to the cart`)
    return console.log(this.state.cart);
  }

  handleIncrement(name) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.map((product) => {
          return product.item.name === name ? { item: product.item, quantity: product.quantity + 1 } : product;
        })
      }
    })
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
          setCart: this.handleAddItemToCart,
          totalPrice: this.state.totalPrice,
          handleIncrement: this.handleIncrement
        }}
      >
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
