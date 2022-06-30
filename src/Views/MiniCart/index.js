import '../../CSS/cart.css'
import { useEffect, useState } from 'react'


const CartView = () => {
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        retrieveProductData()
        retrieveCartData()
    },[])

    const retrieveCartData = () => {
        let cartItems = JSON.parse(localStorage.getItem("cartData"))
        !!cartItems && !!cartItems.length && setCartItems(cartItems)
    }

    const retrieveProductData = () => {
        let products = JSON.parse(localStorage.getItem("productData"))
        setProducts(products)

    }




    return (
        <div className='viewPort-class flex-r align-center'>
            <div className='md-7 gradient-cart'/>
            <div className='cart'>
                
            </div>
        </div>
    )
}