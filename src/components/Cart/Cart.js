import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price, 0);
    
    
    // let total = 0;
    // for (let i = 0; i < props.cart.length; i++) {
    //     const element = props.cart[i];
    //     total = total + element.price;
        
    // }

    const numberMaker = (value) => {
        const fixed = value.toFixed(2);
        const number = Number(fixed);
        return number;
    }

    const tax = total/10; //10% tax
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const grandTotal = total + tax + shipping;
    return (
        <div>
            <h2>Order Summary</h2>
            <p>Item Ordered: {cart.length}</p>
            <p>Product Price: {numberMaker(total)}</p>
            <p><small>Shipping Cost: {shipping} </small></p>
            <p><small>Tax + VAT: {numberMaker(tax)}</small></p>
            <p>Total Price: {numberMaker(grandTotal)}</p>
        </div>
    );
};

export default Cart;