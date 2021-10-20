import React, { Component } from 'react'
import './navbar.css'
import Categories from '../categories/Categories'

export default class Navbar extends Component {

    render() {
        return (
            <nav className='nav-bar'>
                <Categories />
                <div className='nav-bar-cart'>
                    <li>
                        Currencies
                    </li>
                    <li className='cart'>
                        Cart
                    </li>
                </div>    
            </nav>
        )
    }
}
