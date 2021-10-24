import React from 'react'
import parse from 'html-react-parser'
import { APIContext } from '../../Context'

export default function productPageTemplate({ name, brand, description, gallery, attributes, prices }) {
    return (
        <div className="product-container">
        <div className="images-list">
          {gallery.map((image) => <img src={image} alt='product-image' /> )}
        </div> 
        <div className="image-container">
          <img src={gallery[0]} />
        </div>
        <div className="product-status">
          <div className="product-info">
            <h2>{brand}</h2>
            <h3>{name}</h3>
          </div>
          <div className="product-attributes">
            { attributes.map(({ id, name, items }) => {
              return (
                <li 
                  className="product-attribute-items"
                  key={id}>
                  <span className="attribute-name">{name}:</span>
                  <div className="attributes">
                    { items.map(({ id, value }) => {
                      return <span 
                        className="attribute-id" 
                        key={id}>{value}</span>
                      })  
                    }
                  </div>
                </li>
              )
            }) }
          </div>
          <div className="product-price">
            <APIContext.Consumer>
              {({ currentCurrency }) => {
                // formattig the price based on the selected currency
                const productPrice = prices.find((price) => {
                  return price.currency === currentCurrency;
                })
                return <span>{productPrice.amount} {currentCurrency}</span>
              }}
            </APIContext.Consumer>
          </div>
          <div className="add-product">
            <button>ADD TO CART</button>
          </div>
          <div className="product-description">
            {/* Parsing the desciption */}
            {parse(description)}
          </div>
        </div> 
      </div>
    )
}
