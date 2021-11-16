import React, { Component, Fragment } from 'react';
import './navbar.css';
import Categories from '../categories/Categories';
import MiniCart from '../minicart/MiniCart';
import currencyIcons from './CurrencyIcons';
import Currencies from '../currencies/Currencies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APIContext } from '../../Context';
import { faShoppingCart, faSortDown } from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCurrency: false,
      toggleCart: false,
    };
    this.wrapperRef = React.createRef();
    this.miniCartRef = React.createRef();
    this.handleCurrencies = this.handleCurrencies.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }

  handleCurrencies(toggle = true) {
    this.setState({ toggleCurrency: toggle });
  }

  toggleMiniCart() {
    this.setState({ toggleCart: !this.state.toggleCart });
  }

  render() {
    return (
      <APIContext.Consumer>
        {({ cart, err, currentCurrency, handleDisplayCartItemsQuantity }) => {
          return (
            <Fragment>
              <div className={this.state.toggleCart ? 'overlay' : ''}></div>
              {!err && (
                <nav className="nav-bar">
                  <Categories />
                  <div className="nav-bar-items">
                    <div className="currencies" ref={this.wrapperRef}>
                      <div
                        className="currency-icon"
                        onClick={() =>
                          this.setState({
                            toggleCurrency: !this.state.toggleCurrency,
                          })
                        }
                      >
                        <div className="dollar-sign">
                          {currencyIcons(currentCurrency)}
                        </div>
                        <div
                          className={`arrow-down ${
                            this.state.toggleCurrency ? 'transform' : ''
                          }`}
                        >
                          <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
                        </div>
                      </div>
                      <Currencies
                        toggleCurrency={this.state.toggleCurrency}
                        handleCurrencies={this.handleCurrencies}
                        wrapperRef={this.wrapperRef}
                      />
                    </div>
                    <div className="cart" ref={this.miniCartRef}>
                      <div className="cart-logo" onClick={this.toggleMiniCart}>
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                        ></FontAwesomeIcon>
                        {cart.length >= 1 && (
                          <div className="items-count">
                            <span>{handleDisplayCartItemsQuantity()}</span>
                          </div>
                        )}
                      </div>
                      {this.state.toggleCart && (
                        <MiniCart
                          toggleMiniCart={this.toggleMiniCart}
                          toggleCart={this.state.toggleCart}
                          miniCartRef={this.miniCartRef}
                        />
                      )}
                    </div>
                  </div>
                </nav>
              )}
            </Fragment>
          );
        }}
      </APIContext.Consumer>
    );
  }
}
