import '../../CSS/cart.css'
import React, { useEffect, useState } from 'react'
import { storeCartDataLocally } from '../../Utility/StoreLocally'
import { useNavigate } from 'react-router-dom'
import { retreiveLocalCartData, retreiveLocalProductData } from '../../Utility/RetrieveLocalData'


const CartView = ({closeBtn, updateCartPage}) => {
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [inCartProducts, setAddedCart] = useState([])
    const [sum,setSum] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        retrieveProductData()
        retrieveCartData()
    },[])

    useEffect(()=> {
        if(!!cartItems.length && !!products.length){
            let data = []
            cartItems.forEach((item) => {
                products.forEach( i => {
                    if(item.id === i.id)
                        data=[...data,{...i,amt: item.amt}]
                })
            })
            setAddedCart(data)
        }

    },[cartItems, products])


    useEffect(() => {
        storeCartDataLocally(inCartProducts)
        let totalProductSum = 0
        inCartProducts.forEach(a => { totalProductSum += (a.price * a.amt)})
        setSum(totalProductSum)
        updateCartPage()
    },[inCartProducts])

    const retrieveCartData = () => {
        let cartItems = retreiveLocalCartData()
        !!cartItems && !!cartItems.length && setCartItems(cartItems)
    }

    const retrieveProductData = () => {
        let products = retreiveLocalProductData()
        setProducts(products)

    }

    const increaseAmt = (id) => {
        let items = [...inCartProducts]
        items.forEach(item => {
            if(item.id === id){
                item.amt = item.amt + 1;
            }
        })
        setAddedCart(items)
    }

    const decreaseAmt = (id) => {
        let items = [...inCartProducts]
        items.forEach( item => {
            if(item.id === id){
                if(item.amt === 1)
                    item.amt = 0;
                else
                    item.amt = item.amt - 1;
            }
        })
        items = items.filter((a) => a.amt !==0 )
        setAddedCart(items)
    }

    const checkout = () => {
        alert("You have checked out the items from the cart.")
        localStorage.removeItem("cartData")
        navigate('/')
    }

    const closeCart = () => {closeBtn()}

    return (
            <div className='cart-placeholder'>
                <div className='flex-r md-12 heading align-center'>
                        {inCartProducts.length > 0 ? 
                        <h3 className='md-4 offset-md-2'>My Cart {inCartProducts.length} items</h3>
                            :
                        <h3 className='md-4 offset-md-2'>My Cart</h3>}
                        <button onClick={closeCart} className='pointer close-cart-btn md-2 offset-md-4'>X</button>
                </div>
                
                <div className='listing md-12'>
                    {
                        inCartProducts.length > 0 ?
                            <ul>
                                {!!inCartProducts && inCartProducts.length > 0 && inCartProducts.map((item) => {
                                    return(
                                        <li className='flex-r md-12' key={item.id}>
                                            <img src={item.imageURL} alt={item.description} className='pro-img md-2'/>
                                            <div className='flex-c align-center offset-md-2 md-4'>
                                                <p className='semi-bold no-wrap'>
                                                    {item.name}
                                                </p>
                                                <div className='flex-r md-12 action-center justify-spc-between'>
                                                    <button onClick={() => {decreaseAmt(item.id)}} className='minus-btn pointer'>-</button>
                                                    <p className='amount-section'> {item.amt} </p>
                                                    <button onClick={() => {increaseAmt(item.id)}} className='add-btn pointer'>+</button>
                                                    <p className='price semi-bold'>X {item.price}</p>
                                                </div>
                                            </div>
                                            <div className='per-price-amt offset-md-2 md-3 bold'>
                                                    {item.price * item.amt}
                                            </div>
                                    </li>
                                    )
                                })}
                            </ul>

                            :
                            
                            <div className='blank-cart'>
                                <p className='bold'> No items in your cart</p>
                                <p>Your favourite items are just a click away</p>
                            </div>
                    }
                </div>

                <div className='checkout-section flex-c align-center justify-start'>
                    {
                        !!inCartProducts.length ? 
                        <React.Fragment>
                            <p>Promo code can be applied on payment page.</p>
                            <div onClick={checkout} className='pointer flex-r justify-spc-around align-center checkout-block'>
                                <p>Proceed to checkout </p>
                                <p> Rs {sum}</p>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className='pointer flex-r justify-spc-around align-center checkout-block'>
                                <p>Start Shopping</p>
                            </div>
                        </React.Fragment>
                    }
                        
                 </div>

            </div>
    )
}

export default CartView