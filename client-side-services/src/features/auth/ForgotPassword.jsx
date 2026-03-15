import React from 'react'
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'

const ForgotPassword = () => {
  return (
    <div className='container-fluid bg-light'>
      <div className="container-sm bg-white min-vh-100 p-4">
        <p className='h3 mb-3'>Recover your password</p>

        <div className="col-md-8">
          <form action="">
            <div className="form-group mb-2">
              <label htmlFor="email" className='form-label muted fw-bold'>Please enter your registered email</label>
              <TextInput
                type='text'
              />
            </div>
            <div className="form-group mb-2 mt-3">
              <ButtonInput
                type='submit'
                label='Verify email'
                className='btn-dark'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
