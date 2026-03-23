import React, { useState } from 'react'
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'
import { useFormik } from "formik";
import * as Yup from 'yup'
import Alert from '../../components/error/Alert';
import { Link } from 'react-router-dom';
import { useForgetPasswordMutation } from '../../store/api/authApi';
import ResetPassword from './ResetPassword';

const ForgotPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [openModal, setModalOpen] = useState(false)
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await forgetPassword(values).unwrap();

        if (result?.success) {
          setAlert({
            message: result?.message || "OTP sent successfully",
            type: "success",
          });
          window.alert(`This is your otp please verify ${result?.data?.otp}`)
          setEmail(values.email);
          setModalOpen(true);
        }
      } catch (error) {
        setAlert({
          message:
            error?.data?.message || "Something went wrong. Try again.",
          type: "danger",
        });
      }
    },
  });

  if (openModal) {
    return <ResetPassword email={email} />
  }
  return (
    <div className='container-fluid bg-light'>
      <div className="container-sm bg-white min-vh-100 p-4">
        <p className='h3 mb-3'>Recover your password</p>

        {alert.message && (
          <Alert
            message={alert.message}
            type={alert.type}
            duration={5000}
            onClose={() =>
              setAlert({ message: "", type: "success" })
            }
          />
        )}

        <div className="col-md-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-2">
              <label className='form-label fw-bold'>
                Please enter your registered email
              </label>

              <TextInput
                type='email'
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />

              {formik.touched.email && formik.errors.email && (
                <small className="text-danger">
                  {formik.errors.email}
                </small>
              )}
            </div>

            <div className="form-group mb-2 mt-3">
              <ButtonInput
                type='submit'
                label={isLoading ? "Sending..." : "Verify email"}
                className='btn-dark'
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>

          <div className="mt-3">
            <p className='small'>
              Remember password? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;