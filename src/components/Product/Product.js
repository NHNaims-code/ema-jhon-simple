import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={'/product/'+ key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>Price: ${price}</p>
                <p>only {stock} left in stock - order soon</p>
                {
                    props.showAddToCart === true && <button className='main-button' onClick ={() => {props.handleAddProduct(props.product)}}> <FontAwesomeIcon icon={faShoppingCart} /> buy now</button>
                }
                
            </div>
        </div>
    );
};

export default Product;