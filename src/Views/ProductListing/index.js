import {useEffect, useRef, useState} from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import '../../CSS/productPage.css';
import { getProductData, getCategoryData} from '../../ApiRequestData/getAllApiData';
import { useNavigate,useParams } from 'react-router-dom';


const ProductListing = () => {
  const runUseEffectOnce = useRef(false)
  const [productData, setProductData] = useState([])
  const [typeOfProduct, setProductTypes] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])
  const [cartElements, setCartElements] = useState([])
  const [viewCart,setViewCart] = useState(false)
  const navigate = useNavigate()
  const {categoryId} = useParams()

    useEffect(() => {
    if(!runUseEffectOnce.current){
            fetchProductData()
            fetchCategoryData()
            retrieveCartData()
            runUseEffectOnce.current = true
    }
    },[])


    useEffect(() => {
        if(!categoryId)
            setFilteredProduct([])
        else if (!!categoryId && !!typeOfProduct.length && !!productData.length)
            filterProduct(categoryId)
    },[categoryId, typeOfProduct, productData])


    const fetchCategoryData = async() => {
        let data = await getCategoryData()
        localStorage.setItem("categoryData", JSON.stringify(data))
        setProductTypes(data)
    }


    const fetchProductData = async () => {
        let data = await getProductData()
        localStorage.setItem("productData", JSON.stringify(data))
        setProductData(data)
    }


    const filterProduct = (id) =>{
        let urlParams = undefined
        if(!!typeOfProduct.length)
            urlParams = encodeURIComponent(typeOfProduct.find(a => { return (a.id === id)}).id)
        if(!!productData.length){
            let filteredData = productData.filter((a) => {
                return a.category === id
            })
            setFilteredProduct(filteredData)
            navigate(`/products/${urlParams}`)
        }
    }

    const addToCart = (id) => {
        let ids = [...cartElements]
        ids = [...ids, id]
        storeCartDataLocally(ids)
        setCartElements(ids)
    }
   
    const retrieveCartData = () => {
        let data = JSON.parse(localStorage.getItem("cartData"))
        if(!!data)
            setCartElements(data)
    }

    const storeCartDataLocally = (ids) => {
        localStorage.setItem("cartData", JSON.stringify(ids))
    }


    const showCart = () => {
        !!viewCart ? setViewCart(false) : setViewCart(true)
    }



    return (
        <div>
            <Header itemsInCart={!!cartElements && cartElements.length > 0 ? cartElements.length : 0} showCart={showCart}/>
                <div className='product-wrapper md-12 flex-r'>
                    <div className='side-list offset-md-2 md-3'>
                        <ul>
                            {!!typeOfProduct.length && typeOfProduct.map((item) => {
                                return (
                                    <li name={item.id} key={item.id} onClick={() => {filterProduct(item.id)}} id={item.id} className='each-category pointer semi-bold'>
                                        {item.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='productList md-6'>
                        <div className='flex-r flex-w md-12 list-products'>
                            {!!productData.length && filteredProduct.length === 0 && productData.map((item) => {
                                return (
                                    <div key={item.id} id={item.id} className='each-product md-3 pointer flex-c align-start justify-spc-around semi-bold'>
                                        <p className='bold'>{item.name}</p>
                                        <div className='img-product' style={{backgroundImage: "url("+item.imageURL+")"}}/>
                                        <p className='product-description'>
                                            {item.description}
                                        </p>
                                        
                                        <div className='flex-r md-12 align-center justify-spc-around price-buy-section'>
                                            <p className='price-section'>MRP Rs {item.price}</p>
                                            {!cartElements.includes(item.id) && <button onClick={() => {addToCart(item.id)}} className='buy-now pointer'>Buy Now</button>}
                                            {!!cartElements.includes(item.id) && <button disabled className='buy-now pointer'>Added to cart</button>}
                                        </div>
                                    </div>
                                )
                            })}
                            {!!filteredProduct.length && filteredProduct.map((item) => {
                                return (
                                    <div key={item.id} id={item.id} className='each-product md-3 pointer flex-c align-start justify-spc-around semi-bold'>
                                        <p className='bold'>{item.name}</p>
                                        <div className='img-product' style={{backgroundImage: "url("+item.imageURL+")"}}/>
                                        <p className='product-description'>
                                            {item.description}
                                        </p>
                                        
                                        <div className='flex-r md-12 align-center justify-spc-around price-buy-section'>
                                            <p className='price-section'>MRP Rs {item.price}</p>
                                            {!cartElements.includes(item.id) && <button onClick={() => {addToCart(item.id)}} className='buy-now pointer'>Buy Now</button>}
                                            {!!cartElements.includes(item.id) && <button disabled className='buy-now pointer'>Added to cart</button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default(ProductListing)
