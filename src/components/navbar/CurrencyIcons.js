import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faPoundSign,
  faYenSign,
  faRubleSign,
  faFont,
} from '@fortawesome/free-solid-svg-icons';

export default function currencyIcons(currentCurrency) {
  switch (currentCurrency) {
    case 'GBP':
      return <FontAwesomeIcon icon={faPoundSign}></FontAwesomeIcon>;

    // It returns a symbol same as the australian dollar symbol, no austrailian dollar symbol available at font awsome
    case 'AUD':
      return (
        <div style={{ display: 'flex' }}>
          <FontAwesomeIcon icon={faFont}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
        </div>
      );

    case 'JPY':
      return <FontAwesomeIcon icon={faYenSign}></FontAwesomeIcon>;

    case 'RUB':
      return <FontAwesomeIcon icon={faRubleSign}></FontAwesomeIcon>;

    default:
      return <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>;
  }
}
