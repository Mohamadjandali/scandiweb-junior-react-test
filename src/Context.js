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
      err: null,
      currentCurrency: 'USD',
    };
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
    this.handleCheckoutOut = this.handleCheckoutOut.bind(this);
    this.handleDisplayCartItemsQuantity =
      this.handleDisplayCartItemsQuantity.bind(this);
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
                  attributes {
                    id,
                    name
                    type,
                    items {
                      displayValue,
                      value,
                      id,
                    }
                  },
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
      return this.setState({ err: error.message });
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

    console.log(this.state.products);
  }

  // Adds a product to the cart
  handleAddProductToCart(product, selectedAttributes) {
    const { name, attributes } = product;

    // Checking if the product has any available attributes
    // if (item.attributes.length) {
    //   //  checking if all the attributes are selected
    //   const attribute = attributes.every((attr) => attr.hasOwnProperty('item'));

    //   // if the user didnt add an attribute an alert will occuer and cancel the operation
    //   if (!attribute) {
    //     return alert('Please select all the properites for this product!');
    //   }
    // }

    // checks if the product is already in cart
    const foundProduct = this.state.cart.find((cartItem) => {
      return cartItem.name === name;
    });

    if (foundProduct) {
      return alert('this product is already in your cart');
    }

    // add a product to the cart
    this.setState(
      (prevState) => {
        return {
          cart: [
            {
              ...product,
              quantity: 1,
              attributes: selectedAttributes || attributes,
            },
            ...prevState.cart,
          ],
        };
      },
      () => console.log(this.state.cart)
    );

    return alert(`added ${name} to the cart`);
  }

  // Increases the cart item count
  handleIncrement(productName) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.map((cartItem) => {
          return cartItem.name === productName
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem;
        }),
      };
    });
  }

  // Decreases the cart item count and if the cart item count becomes zero it will be removed
  handleDecrement(productName) {
    this.setState(
      (prevState) => {
        return {
          cart: prevState.cart.map((cartItem) => {
            return cartItem.name === productName
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                }
              : cartItem;
          }),
        };
      },
      () => {
        this.state.cart.map((cartItem) => {
          if (cartItem.quantity === 0) {
            return this.handleRemoveCartItem(cartItem.id);
          }

          return cartItem;
        });
      }
    );
  }

  // Removes the a cart item. THIS FUNCTION ONLY TRIGGERS WHEN THE CART ITEM COUNT REACHES 0
  handleRemoveCartItem(productId) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.filter((product) => product.id !== productId),
      };
    });
  }

  handleTotalPrice(cart, prices, selectedCurrency) {
    /*  looping over the cart items to get all prices and getting the first element 
    currency is equal to the selected state currenct  */
    const cartItemsPricesIndex = prices[0].findIndex(
      (price) => price.currency === selectedCurrency
    );

    // getting the total price
    const newPrice = cart.reduce((total, product) => {
      return (
        total + product.prices[cartItemsPricesIndex].amount * product.quantity
      );
    }, 0);

    return Math.round(newPrice);
  }

  handleCurrencyChange(currency) {
    return this.setState({ currentCurrency: currency });
  }

  handleDisplayProductPrice(productPrices, selectedCurrency) {
    const productPrice = productPrices.find((price) => {
      return price.currency === selectedCurrency;
    });

    return `${productPrice.amount}`;
  }

  handleCheckoutOut() {
    this.setState({ cart: [] });
    alert('Thanks for your shopping');
  }

  handleDisplayCartItemsQuantity() {
    const totalCartItemsQuantity = this.state.cart.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    return totalCartItemsQuantity;
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
          err: this.state.err,
          setCurrency: this.handleCurrencyChange,
          handleAddProductToCart: this.handleAddProductToCart,
          handleIncrement: this.handleIncrement,
          handleDecrement: this.handleDecrement,
          handleTotalPrice: this.handleTotalPrice,
          handleDisplayProductPrice: this.handleDisplayProductPrice,
          handleCheckoutOut: this.handleCheckoutOut,
          handleDisplayCartItemsQuantity: this.handleDisplayCartItemsQuantity,
        }}
      >
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
