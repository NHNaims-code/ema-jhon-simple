import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, price, img, key, quantity} = props.product;

    return (
        <div className="reviewItemStyle">
           <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: {price}</small></p>
            <br/>
            <button onClick={() => {props.removeItem(key)}} className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;