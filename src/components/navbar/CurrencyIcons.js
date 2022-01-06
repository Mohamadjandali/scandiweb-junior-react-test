import React from 'react';
import dollarSign from '../../icons/dollar.svg';
import yenSign from '../../icons/yen.svg';
import rubleSign from '../../icons/ruble.svg';
import australianDollar from '../../icons/australian-dollar.png';
import pound from '../../icons/pound.svg';

export default function currencyIcons(currentCurrency) {
  switch (currentCurrency) {
    case 'GBP':
      return (
        <img src={pound} alt="" style={{ width: '20px', height: '20px' }} />
      );

    // It returns a symbol same as the australian dollar symbol, no austrailian dollar symbol available at font awsome
    case 'AUD':
      return (
        <img
          src={australianDollar}
          alt=""
          style={{ width: '20px', height: '20px' }}
        />
      );

    case 'JPY':
      return (
        <img src={yenSign} alt="" style={{ width: '20px', height: '20px' }} />
      );

    case 'RUB':
      return (
        <img src={rubleSign} alt="" style={{ width: '20px', height: '20px' }} />
      );

    default:
      return (
        <img
          src={dollarSign}
          alt=""
          style={{
            width: '16px',
            height: '20px',
            padding: '0px',
            margin: '0px',
          }}
        />
      );
  }
}
