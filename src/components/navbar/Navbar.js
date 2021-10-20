import React, { Component } from 'react'
import './navbar.css'
import Categories from '../categories/Categories'
import Currencies from '../currencies/Currencies'

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
                <div className='nav-bar-cart'>
                    <div className='currencies'>
                        <span onClick={this.handleCurrencies}>Currencies</span>
                        <Currencies toggleCurrency={this.state.toggleCurrency} />
                    </div>
                    <div className='cart'>
                        <span>Cart</span>                   
                    </div>
                </div>    
            </nav>
        )
    }
}
