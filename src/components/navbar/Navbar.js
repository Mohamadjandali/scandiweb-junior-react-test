import React, { Component } from 'react'
import './navbar.css'
import Categories from '../categories/Categories'
import Currencies from '../currencies/Currencies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, 
    faDollarSign,
    faSortDown
} from '@fortawesome/free-solid-svg-icons'
import MiniCart from '../cart/MiniCart'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleCurrency: false
        }
        this.handleCurrencies = this.handleCurrencies.bind(this);
    }

    handleCurrencies() {
        this.setState({ toggleCurrency: !this.state.toggleCurrency })
    }

    render() {
        return (
            <React.Fragment>
                <div className='overlay'></div>
                <nav className='nav-bar'>
                    <Categories />
                    <div className='nav-bar-items'>
                        <div className='currencies'>
                            <div
                                className='currency-icon'
                                onClick={this.handleCurrencies}
                            >
                                <div className='dollar-sign'>
                                    <FontAwesomeIcon 
                                        icon={faDollarSign}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className={`arrow-down ${this.state.toggleCurrency ? 'transform' : ''}`}>
                                    <FontAwesomeIcon
                                        icon={faSortDown}
                                    ></FontAwesomeIcon>
                                </div>
                            </div>
                            <Currencies toggleCurrency={this.state.toggleCurrency} />
                        </div>
                        <div className='cart'>
                            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                            <div className='items-count'><span>1</span></div>
                            <MiniCart />
                        </div>
                    </div>    
                </nav>
            </React.Fragment>
        )
    }
}
