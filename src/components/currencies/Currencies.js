import React, { Component } from 'react';
import { APIContext } from '../../Context';
import currencyIcons from '../navbar/CurrencyIcons';
import './currencies.css';

export default class Currencies extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.props.wrapperRef.current.contains(event.target)) {
        this.props.handleCurrencies(false);
    }
  }

  render() {
    return (
      <React.Fragment>
        <ul className={this.props.toggleCurrency ? 'currencies-list' : 'hide'}>
          <APIContext.Consumer>
            {({ currencies, setCurrency }) => {
              return currencies.map((currency) => (
                <li
                  key={currency}
                  onClick={() => {
                    setCurrency(currency);
                    return this.props.handleCurrencies(false);
                  }}
                >
                  <div className="currency-item-list">
                    <span className="currency-icon">{currencyIcons(currency)}</span>
                    <span>{currency}</span>
                  </div>
                </li>
              ));
            }}
          </APIContext.Consumer>
        </ul>
      </React.Fragment>
    );
  }
}
