import React, { Component, createContext } from 'react';
import doAPIRequest from './request';
import { v4 as uuidv4 } from 'uuid';

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
    this.handleDuplicateProducts = this.handleDuplicateProducts.bind(this);
    this.handleNoProductAttributesToCart =
      this.handleNoProductAttributesToCart.bind(this);
    this.handleActiveAttribute = this.handleActiveAttribute.bind(this);
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

  // This function generates a new id for the same product to differenciate between each cart item
  handleDuplicateProducts(product, arrayOfAttributes) {
    // Generating a random id to the cart item to avoid duplication
    const randomId = uuidv4();
    this.setState((prevState) => {
      return {
        ...prevState,
        cart: [
          {
            ...product,
            quantity: 1,
            id: randomId,
          },
          ...prevState.cart,
        ],
        cartItemAttributes: [
          {
            ...arrayOfAttributes,
            productId: randomId,
          },
          ...prevState.cartItemAttributes,
        ],
      };
    });

    return alert(`added ${product.name} to the cart`);
  }

  handleNoProductAttributesToCart(product) {
    const { id, name } = product;

    if (this.state.cart.find((item) => item.id === id)) {
      return this.handleIncrement(id);
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        cart: [
          {
            ...product,
            quantity: 1,
          },
          ...prevState.cart,
        ],
      };
    });

    return alert(`added ${name} to the cart`);
  }

  // Adds a product to the cart
  handleAddProductToCart(product, selectedAttributes) {
    const { name } = product;
    const { attributes } = selectedAttributes;

    const attributeValues = attributes.map((attribute) => attribute.value);
    const attributeIds = attributes.map((attribute) => attribute.id);

    const updatedCartAttributes = this.state.cartItemAttributes.slice();
    const duplicateAttributes = updatedCartAttributes.find((item) => {
      return item.attributes.every((attribute, index) => {
        return (
          attribute.value === attributeValues[index] &&
          attribute.id === attributeIds[index]
        );
      });
    });

    const updatedCart = this.state.cart.slice();
    const duplicateProducts = updatedCart.find((item) => item.name.match(name));

    if (!product.attributes.length) {
      return this.handleNoProductAttributesToCart(product);
    }

    if (duplicateAttributes !== undefined && duplicateProducts !== undefined) {
      return this.handleIncrement(duplicateAttributes.productId);
    }

    if (duplicateAttributes === undefined && duplicateProducts !== undefined) {
      return this.handleDuplicateProducts(product, selectedAttributes);
    }

    this.setState((prevState) => {
      return {
        cart: [
          {
            ...product,
            quantity: 1,
          },
          ...prevState.cart,
        ],
        cartItemAttributes: [
          {
            ...selectedAttributes,
          },
          ...prevState.cartItemAttributes,
        ],
      };
    });

    return alert(`added ${name} to the cart`);
  }

  // Increases the cart item count
  handleIncrement(productId) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.map((cartItem) => {
          return cartItem.id === productId
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
  handleDecrement(productId) {
    this.setState(
      (prevState) => {
        return {
          cart: prevState.cart.map((cartItem) => {
            return cartItem.id === productId
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
  handleRemoveCartItem(id) {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.filter((product) => product.id !== id),
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

  handleCartItemAttributes(
    id,
    cartItemAttributeName,
    cartItemValue,
    cartItemId
  ) {
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
                        value: cartItemValue,
                        id: cartItemId,
                      }
                    : item;
                }),
              }
            : attribute;
        }),
      };
    });

    this.handleActiveAttribute(id, cartItemAttributeName, cartItemValue);
  }

  handleActiveAttribute(itemId, attributeName, attributeValue) {
    const updatedCart = this.state.cartItemAttributes.slice();
    const foundAttributes = updatedCart.find((item) => {
      return item.productId === itemId;
    });

    if (foundAttributes) {
      return foundAttributes.attributes.find((attribute) => {
        return (
          attribute.value === attributeValue && attribute.name === attributeName
        );
      });
    }

    return false;
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
          handleNoProductAttributesToCart: this.handleNoProductAttributesToCart,
          handleActiveAttribute: this.handleActiveAttribute,
        }}
      >
        {this.props.children}
      </APIContext.Provider>
    );
  }
}
