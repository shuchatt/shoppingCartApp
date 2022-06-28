import {useEffect, useRef, useState} from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import AlternateSections from '../../Components/AlternateSections';
import '../../CSS/homepage.css';
import {getBannerData} from '../../ApiRequestData/getAllApiData';
import Slider from "react-slick";
import fruits from '../../StaticImg/category/fruits.png';
import baby from '../../StaticImg/category/baby.png';
import bakery from '../../StaticImg/category/bakery.png';
import beverages from '../../StaticImg/category/beverages.png';
import beauty from '../../StaticImg/category/beauty.png';



const NextArrow = ({ className, style, onClick }) => {
  return (<div title="next" onClick={onClick} style={{ ...style, display: "block", background: "#B6B6B6",padding: "4px", borderRadius: '3px' }} className={className}>Next</div>)
}

const PrevArrow = ({ className, style, onClick }) => {
  return (<div title="previous" onClick={onClick} style={{ ...style, display: "block", background: "#B6B6B6", padding: "4px", borderRadius: '3px' }} className={className}>Prev</div>)
}


const HomePage = () => {
  const runUseEffectOnce = useRef(false)
  const [bannerData,setBannerData] = useState([])
  const settings = {
        dots: true,
        arrows: true,
        accessibility: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 1800,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        swipe: true,
        swipeToSlide: true
      };

useEffect(() => {
  if(!runUseEffectOnce.current){
      fetchBannerData()
      runUseEffectOnce.current = true
  }
},[])

const fetchBannerData = async () => {
    let data = await getBannerData()
    setBannerData(data)
}


  return (
    <div>
        <Header/>

        <div className='banner-section'>
          {
            !!bannerData.length &&
            <Slider {...settings} >
              {!!bannerData.length && bannerData.map((item,index)=>{
                return(
                    <img loading="lazy" key={index} id={item.id} src={item.bannerImageUrl} alt={item.bannerImageAlt} />
                )
              })}
            </Slider>
          }
        </div>

        <div className='sections flex-c justify-center align-center'>
          <AlternateSections
              geometry="right"
              imgUrl={fruits}
              heading={"Fruits & Vegetables"}
              desc={"A variety of fresh fruits and vegetables"}
              btnText={"fruit-and-veg"}
          />
          <AlternateSections
              geometry="left"
              imgUrl={bakery}
              heading={"Bakes Cakes and Dairy"}
              desc={"The best of cupcakes, cookies, cakes, pies, cheesecakes,fresh bread, biscotti, muffins, bagels, fresh coffee milk and more."}
              btnText={"bakery-cakes-dairy"}
          />
          <AlternateSections
              geometry="right"
              imgUrl={beverages}
              heading={"Beverages"}
              desc={"Our beverage department will ensure your fridge is fully stocked. Shop for soda, juice, beer and more."}
              btnText={"beverages"}
          />
          <AlternateSections
              geometry="left"
              imgUrl={beauty}
              heading={"Beauty and Hygiene"}
              desc={"Buy beauty and personal care products online in India at best prizes"}
              btnText={"beauty-hygiene"}
          />
          <AlternateSections
              geometry="right"
              imgUrl={baby}
              heading={"Baby Care"}
              desc={"Shop online for Baby Products,Diapers, Skin Care Products"}
              btnText={"baby"}
          />
        </div>

        <Footer/>
    </div>
  )
}

export default(HomePage)
