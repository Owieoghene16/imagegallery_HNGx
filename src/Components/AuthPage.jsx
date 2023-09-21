const SignUp = () => {
  return(
    <div className="signup-form">
      <h1>SignUp now</h1>
      <form>
        <input 
          type="text" 
          className="input-box" 
          placeholder="Your username" 
        />
        <input 
          type="email" 
          className="input-box" 
          placeholder="Your Email" 
        />
        <input 
          type="text" 
          className="input-box" 
          placeholder="Your Password" 
        />
        <p><span><input type="checkbox" /></span>I agree to the terms and service</p>
        <button type="button" className="signup-btn">Sign Up</button>
        <hr />
        <p className="or">OR</p>
        <button type="button" className="twitter-btn">Login with Twitter</button>
        <p>Do you have an account? <a href="#">Sign In</a></p>
      </form>
    </div>
  )
}

export default SignUp;