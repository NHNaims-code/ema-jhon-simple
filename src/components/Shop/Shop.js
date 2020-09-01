import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'; 
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])
    useEffect(() => {
        const saveProduct = getDatabaseCart();
        const savedKeys = Object.keys(saveProduct);
        const previousProduct = savedKeys.map(key => {
            const existingProduct = fakeData.find(pd => pd.key === key);
            existingProduct.quantity = saveProduct[key]
            return existingProduct;
        })
        setCart(previousProduct);
    },[])

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let newCart;
        let count = 1;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key)
            newCart = [...others, sameProduct]
        }else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
           <div className="product-container">
                <ul>
                    {
                        products.map( product => <Product key={product.key} handleAddProduct= {handleAddProduct} product = {product} showAddToCart={true}></Product>)
                    }
                </ul>
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                    <button className="main-button">review order</button>
                    </Link>
                </Cart>
           </div>
        </div>
    );
};

export default Shop;