import '../CSS/header.css';
import { useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import cartLogo from '../StaticImg/cart.svg';
import { checkIfUserIsSignedUp } from '../Utility/CheckLogin';
const logoImg = require("../StaticImg/logo.png");



const Header = () => {
  const [isLoggedIn,setLoginData] = useState(null)
  const itemCount = 0;
  const navigate = useNavigate()

  useEffect(() => {
    checkIfUserIsSignedUp().then((loggedInData) => {
      setLoginData(loggedInData.email)
    },() => {setLoginData(null)})
  },[])

  const signInUser = () => {
    navigate("/signInUser")
  }

  const registerNewUser = () => {
    navigate("/registerNewUser")
  }

  const LogOut = () =>{
    sessionStorage.clear()
    alert("You have been logged out.")
    setLoginData(null);
  }
  

  return (
    <div className='header-container flex-r align-center'>

      <img alt="logo-homepage" src={logoImg} className='pointer sabka-bazaar-img offset-md-1 md-2'/>

      <div className='nav-links flex-r offset-md-1 md-2'>
          <Link className='link semi-bold md-5' to="/">Home</Link>
          <Link className='link semi-bold offset-md-1 md-6' to="/products">Products</Link>
      </div>

      <div className='loginPanel flex-c offset-md-3 md-1'>

          {!isLoggedIn &&
            <div className='flex-r'>
              <p onClick={signInUser} className='md-6 pointer'>Sign In</p>
              <p onClick={registerNewUser} className='md-5 offset-md-1 pointer'>Register</p>
            </div>
          }
          {
            !!isLoggedIn && 
            <div className='flex-r'>
              <p className='md-3 offset-md-2 pointer'>{isLoggedIn.split('@')[0]}</p>
              <p onClick={LogOut} className='md-3 offset-md-1 pointer'>LogOut</p>
            </div>
          }

          <div className='cart-menu-section flex-r align-center justify-center'>
              <img src={cartLogo} alt='cart-logo' className='md-3 offset-md-1'/>
              <p className='offset-md-2 md-4 item-count'>{`${itemCount} items`}</p>
          </div>


      </div>

    </div>
  )
}

export default Header;
