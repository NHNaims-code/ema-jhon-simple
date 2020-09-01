import React, { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { useEffect } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import HappyImage from '../../images/giphy.gif'

const Review = () => {
    const databaseCart = getDatabaseCart();
    const keys = Object.keys(databaseCart)
    const [cart, setCart] = useState([])
    const [placeOrder, setPlaceOrder] = useState(false);
    useEffect(() => {
        const cartProducts = keys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = databaseCart[key]
            return product;
        })
        setCart(cartProducts)
        console.log(cart);
    },[])
    // const quantities = Object.values(databaseCart)
    const removeItem = (productKey) => {
        console.log('remove item worked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    
    const handlePlaceOrder = () => {
        processOrder()
        setCart([]);
        setPlaceOrder(true);
        console.log('place order clicked');
    }

    let thankYou;
    if(placeOrder){
        thankYou = <img src={HappyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            <h1>Cart Items : {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem product ={pd} removeItem={removeItem} key={pd.key}></ReviewItem>)
            }
            {
                thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;