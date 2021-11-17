import React, { Component, createContext } from 'react';
import doAPIRequest from './request';

export const APIContext = createContext();

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      cart: [],
      cartItemAttributes: [],
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
    this.handleCartItemAttributes = this.handleCartItemAttributes.bind(this);
  }

  async componentDidMount() {
    const [data, error] = await doAPIRequest(
      `
        query {
          categories {
              name,
          }
          currencies
        }
      `
    );

    if (error) {
      return this.setState({ err: error.message });
    }

    const { categories, currencies } = data.data;

    this.setState({
      categories: categories,
      currencies: currencies,
    });
  }

  // Adds a product to the cart
  handleAddProductToCart(product, selectedAttributes) {
    const { id, name, attributes } = product;

    // checks if the product is already in cart
    if (this.state.cart.find((cartItem) => cartItem.name === name)) {
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
            },
            ...prevState.cart,
          ],
          cartItemAttributes: !selectedAttributes
            ? [
                {
                  productId: id,
                  attributes: [...attributes],
                },
                ...prevState.cartItemAttributes,
              ]
            : [...selectedAttributes, ...prevState.cartItemAttributes],
        };
      },
      () => {
        return console.log(this.state.cart, this.state.cartItemAttributes);
      }
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

  handleCartItemAttributes(id, cartItemAttributeName, cartItemvale) {
    this.setState((prevState) => {
      return {
        cartItemAttributes: prevState.cartItemAttributes.map((attribute) => {
          return attribute.productId === id
            ? {
                ...attribute,
                attributes: attribute.attributes.map((item) => {
                  return item.name === cartItemAttributeName
                    ? {
                        name: cartItemAttributeName,
                        value: cartItemvale,
                      }
                    : item;
                }),
              }
            : attribute;
        }),
      };
    });
  }

  render() {
    return (
      <APIContext.Provider
        value={{
          categories: this.state.categories,
          currencies: this.state.currencies,
          currentCurrency: this.state.currentCurrency,
          cart: this.state.cart,
          cartItemAttributes: this.state.cartItemAttributes,
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
          handleCartItemAttributes: this.handleCartItemAttributes,
        }}
      >
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
