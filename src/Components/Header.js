import '../CSS/header.css';
import { useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import cartLogo from '../StaticImg/cart.svg';
const logoImg = require("../StaticImg/logo.png");



const Header = () => {
  const [isLoggedIn,setLoginData] = useState(false)
  const data = null;
  const itemCount = 0;
  const navigate = useNavigate()

  const signInUser = () => {
    navigate("/signInUser")
  }

  const registerNewUser = () => {
    navigate("/registerNewUser")
  }

  return (
    <div className='header-container flex-r align-center'>

      <img src={logoImg} className='sabka-bazaar-img offset-md-1 md-2'/>

      <div className='nav-links flex-r offset-md-1 md-2'>
          <Link className='link semi-bold md-5' to="/">Home</Link>
          <Link className='link semi-bold offset-md-1 md-6' to="/products">Products</Link>
      </div>

      <div className='loginPanel flex-c offset-md-3 md-1'>

          {!isLoggedIn &&
            <div className='flex-r'>
              <p onClick={signInUser} className='md-6'>Sign In</p>
              <p onClick={registerNewUser} className='md-5 offset-md-1'>Register</p>
            </div>
          }
          {
            !!isLoggedIn && <p>{data}</p>
          }

          <div className='cart-menu-section flex-r align-center justify-center'>
              <img src={cartLogo} className='md-3 offset-md-1'/>
              <p className='offset-md-2 md-4 item-count'>{`${itemCount} items`}</p>
          </div>


      </div>

    </div>
  )
}

export default Header;
