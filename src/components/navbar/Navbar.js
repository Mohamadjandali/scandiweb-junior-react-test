import React, { Component } from 'react'
import './navbar.css'
import Categories from '../categories/Categories'
import Currencies from '../currencies/Currencies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, 
    faDollarSign,
    faSortDown
} from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            toggleCurrency: false
        }
        this.handleCurrencies = this.handleCurrencies.bind(this);
    }

    handleCurrencies() {
        this.setState({ toggleCurrency: !this.state.toggleCurrency })
        console.log(this.state.toggleCurrency);
    }

    render() {
        return (
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
                        <div className='items'><span>1</span></div>         
                    </div>
                </div>    
            </nav>
        )
    }
}
