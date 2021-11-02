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
      totalPrice: [],
      currentCurrency: 'USD',
    };
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleRemoveItemCart = this.handleRemoveItemCart.bind(this);
    this.handleCheckoutOut = this.handleCheckoutOut.bind(this);
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

  

  handleAddItemToCart(item, attributes) {

    // Checking if the product has any available attributes
    if (item.attributes.length) {
      //  checking if all the attributes are selected
      const attribute = attributes.every((attr) => attr.hasOwnProperty('item'));

      // if the user didnt add an attribute an alert will occuer and cancel the operation
      if (!attribute) {
        return alert('Please select all the properites for this product!');
      }
    }

    // checks if the product is already in cart
    const foundProduct = this.state.cart.find((product) => {
      return product.item.name === item.name;
    });

    if (foundProduct) {
      return alert('this product is already in your cart');
    }

    // add a product to the cart
    this.setState((prevState) => {
      return {
        cart: [{ id: item.id, item, quantity: 1, attributes }, ...prevState.cart],
      };
    });

    console.log(this.state.cart);

    return alert(`added ${item.name} to the cart`);
  }



  handleIncrement(name) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.map((product) => {
          return product.item.name === name
            ? { id: product.id, item: product.item, quantity: product.quantity + 1, attributes: product.attributes }
            : product;
        }),
      };
    });

    console.log(this.state.cart)
  }

  handleDecrement(name) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.map((product) => {
          return product.item.name === name
            ? { id: product.id, item: product.item, quantity: product.quantity - 1, attributes: product.attributes }
            : product;
        }),
      };
    });

    console.log(this.state.cart)
  }

  handleRemoveItemCart(productId) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.filter((product) => product.id !== productId)
      }
    })
  }

  handleTotalPrice(cart, prices, selectedCurrency) {
    /*  looping over the cart items to get all prices and getting the first element 
    currency is equal to the selected state currenct  */
    const cartItemsPrices = prices[0].findIndex((price) => price.currency === selectedCurrency);

    // getting the total price
    const newPrice = cart.reduce((total, item) => {
      return total + item.item.prices[cartItemsPrices].amount * item.quantity;
    }, 0);

    return Math.round(newPrice);
  }



  handleCurrencyChange(currency) {
    return this.setState({ currentCurrency: currency });
  }



  handleDisplayProductPrice(availableCurrencies, selectedCurrency) {
    const productPrice = availableCurrencies.find((currency) => {
      return currency.currency === selectedCurrency;
    });

    return `${productPrice.amount} ${productPrice.currency}`;
  }

  handleCheckoutOut() {
    this.setState({ cart: [] });
    alert('Thanks for your shopping');
  }


  render() {
    return (
      <APIContext.Provider
        value={{
          categories: this.state.categories,
          products: this.state.products,
          currencies: this.state.currencies,
          currentCurrency: this.state.currentCurrency,
          cart: this.state.cart,
          totalPrice: this.state.totalPrice,
          setCurrency: this.handleCurrencyChange,
          handleAddItemToCart: this.handleAddItemToCart,
          handleIncrement: this.handleIncrement,
          handleDecrement: this.handleDecrement,
          handleTotalPrice: this.handleTotalPrice,
          handleDisplayProductPrice: this.handleDisplayProductPrice,
          handleRemoveItemCart: this.handleRemoveItemCart,
          handleCheckoutOut: this.handleCheckoutOut,
        }}
      >
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
