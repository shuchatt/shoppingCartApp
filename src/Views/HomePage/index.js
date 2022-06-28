import {useEffect, useRef, useState} from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import '../../CSS/homepage.css';
import {getBannerData} from '../../ApiRequestData/getAllApiData';
import Slider from "react-slick";

function NextArrow({ className, style, onClick }){
  return (<div onClick={onClick} style={{ ...style, display: "block", background: "#dcdcdc",padding: "4px", borderRadius: '3px' }} className={className}>Next</div>)
}

function PrevArrow({ className, style, onClick }){
  return (<div onClick={onClick} style={{ ...style, display: "block", background: "#dcdcdc", padding: "4px", borderRadius: '3px' }} className={className}>Prev</div>)
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
        autoplaySpeed: 1500,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <NextArrow/>,
        nextArrow: <PrevArrow/>,
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




const renderThumbs = () => { return null}

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
        <div className=''>

        </div>

        <Footer/>
    </div>
  )
}

export default(HomePage)
