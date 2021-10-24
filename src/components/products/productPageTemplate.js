import React from 'react'
import parse from 'html-react-parser'

export default function productPageTemplate({ name, brand, description, gallery, attributes }) {
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
          <div className="add-product">
            <button>ADD TO CART</button>
          </div>
          <div className="product-description">
            {parse(description)}
          </div>
        </div> 
      </div>
    )
}
