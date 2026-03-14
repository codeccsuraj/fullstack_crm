import React from 'react'
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'
import CheckBox from '../../components/form/CheckBox'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Left side image */}
        <div className="col-md-8 d-none d-md-block p-0">
          <img
            src="https://images.pexels.com/photos/7174683/pexels-photo-7174683.jpeg"
            alt="Login visual"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        </div>

        {/* Right side login form */}
        <div className="col-md-4 d-flex align-items-center justify-content-center bg-secondary-subtle">
          <div className="w-75">
            <p className="h4 text-center">Welcome Back</p>
            <p className='h6 text-center mb-4'>Login here to continue</p>
            <form className='mt-4'>
              <div className="mb-4">
                <TextInput
                  label='Email address'
                  placeholder='Enter your email'
                />
              </div>
              <div className="mb-4">
                <TextInput
                  label='Password'
                  placeholder='Enter your password'
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2 align-items-center">
                  <CheckBox />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#" className="text-decoration-none">Forgot password?</a>
              </div>
              <div className='mt-4'>
                <ButtonInput
                  label='Login'
                  className='btn-main w-100'
                />
              </div>
            </form>
            <p className="text-center mt-2">
              Don’t have an account? <Link to="/register" className="text-decoration-none">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
