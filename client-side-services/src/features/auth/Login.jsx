import React, { useState } from 'react'
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../store/api/authApi'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux'
import { setUserSession } from '../../store/slice/authSlice'
import Alert from '../../components/error/Alert'

const Login = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(4, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        if (result?.success) {
          setAlert({
            message: result?.message || "Registration successful",
            type: "success",
          });
          dispatch(setUserSession({
            user: result.data,
            token: result.token
          }))
          navigate(from, { replace: true });
        }
      } catch (error) {
        setAlert({
          message: error?.data?.message || "Something went wrong",
          type: "danger",
        });
      }
    },
  });
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

            {alert.message && (
              <Alert
                message={alert.message}
                type={alert.type}
                duration={5000}
                onClose={() => setAlert({ message: "", type: "success" })}
              />
            )}
            <form onSubmit={formik.handleSubmit} className='mt-4'>
              <div className="mb-4">
                <label htmlFor="email" className='form=label0'>Email</label>
                <TextInput
                  label='Email address'
                  placeholder='Enter your email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className='form=label'>Password</label>
                <TextInput
                  label='Password'
                  placeholder='Enter your password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">{formik.errors.password}</small>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
              </div>
              <div className='mt-4'>
                <ButtonInput
                  type='submit'
                  label='Login'
                  className='btn-dark w-100'
                  loading={isLoading}
                />
              </div>
            </form>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/register" className="text-decoration-none">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
