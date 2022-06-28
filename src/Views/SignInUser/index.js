import '../../CSS/signInUser.css'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

const SignInUser = () => {
  return (
    <div className="container-sign">
      <Header/>
          <div className='sign-in-pad flex-r align-center'>

            <div className='md-3 offset-md-3 flex-c align-start justify-spc-between'>
                <h2>Login</h2>
                <p className='semi-bold'>Get access to your Orders, Wishlist and Recommendations</p>
            </div>

            <div className='login-block offset-md-1 md-3 flex-c align-start justify-between'>

                <p>Email</p>
                <input type='email'/>
                <p>Password</p>
                <input type='password'/>

                <div className='login-btn pointer'>
                    Login
                </div>
            </div>

          </div>
      <Footer/>
    </div>
  )
}

export default SignInUser;
