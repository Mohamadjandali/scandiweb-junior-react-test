import React, { Component } from 'react'
import './navbar.css'
import Categories from '../categories/Categories'
import Currencies from '../currencies/Currencies'

export default class Navbar extends Component {

    render() {
        return (
            <nav className='nav-bar'>
                <Categories />
                <div className='nav-bar-cart'>
                    <div className='currencies'>
                        <span>Currencies</span>
                        <Currencies />
                    </div>
                    <div className='cart'>
                        <span>Cart</span>                   
                    </div>
                </div>    
            </nav>
        )
    }
}
