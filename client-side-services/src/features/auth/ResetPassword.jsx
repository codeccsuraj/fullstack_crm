import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useResetPasswordMutation } from '../../store/api/authApi'
import Alert from '../../components/error/Alert'

const ResetPassword = ({ email }) => {
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const [alert, setAlert] = useState({
        message: "",
        type: "success",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    // ✅ Validation Schema
    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('New password is required'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm password is required'),

        otp: Yup.string()
            .matches(/^\d{6}$/, "OTP must be 6 digits")
            .required("OTP is required"),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
            otp: ''
        },
        validationSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    email,
                    otp: values.otp,
                    password: values.newPassword // ✅ match backend
                };

                console.log("RESET PASSWORD PAYLOAD 👉", payload);

                const result = await resetPassword(payload).unwrap();

                if (result?.success) {
                    setAlert({
                        message: result?.message || "Password reset successfully",
                        type: "success",
                    });

                    resetForm();

                    // ✅ Redirect after success
                    setTimeout(() => {
                        navigate(from, { replace: true });
                    }, 1500);
                }

            } catch (error) {
                setAlert({
                    message: error?.data?.message || "Failed to reset password",
                    type: "danger",
                });
            }
        }
    });

    return (
        <div className='container-fluid'>
            <div className="bg-white shadow-sm border-bottom mb-4">
                <div className="d-flex align-items-center py-2 px-3">
                    <button
                        type='button'
                        onClick={() => navigate(-1)}
                        className="btn btn-link p-0 me-3 text-decoration-none"
                    >
                        <FiArrowLeft size={24} className="text-muted" />
                    </button>

                    <h4 className="mb-0 fw-semibold text-dark">
                        Reset your password
                    </h4>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">

                    {alert.message && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            duration={5000}
                            onClose={() => setAlert({ message: "", type: "success" })}
                        />
                    )}

                    <form onSubmit={formik.handleSubmit}>

                        {/* New Password */}
                        <div className="form-group mb-3">
                            <label className='form-label'>New password</label>

                            <TextInput
                                type='password'
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                toggleEye={true}
                                disabled={isLoading}
                            />

                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <small className="text-danger">
                                    {formik.errors.newPassword}
                                </small>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group mb-3">
                            <label className='form-label'>Confirm password</label>

                            <TextInput
                                type='password'
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                toggleEye={true}
                                disabled={isLoading}
                            />

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <small className="text-danger">
                                    {formik.errors.confirmPassword}
                                </small>
                            )}
                        </div>

                        {/* OTP */}
                        <div className="form-group mb-3">
                            <label className='form-label'>Enter your 6 digit OTP</label>

                            <TextInput
                                type='text'
                                name='otp'
                                value={formik.values.otp}
                                onChange={(e) => {
                                    // ✅ allow only numbers
                                    const val = e.target.value.replace(/\D/g, "");
                                    formik.setFieldValue("otp", val);
                                }}
                                onBlur={formik.handleBlur}
                                maxLength={6}
                                disabled={isLoading}
                            />

                            {formik.touched.otp && formik.errors.otp && (
                                <small className="text-danger">
                                    {formik.errors.otp}
                                </small>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <ButtonInput
                                type='submit'
                                label={isLoading ? "Saving..." : "Save changes"}
                                className='btn-dark'
                                loading={isLoading}
                                disabled={isLoading || formik.values.otp.length !== 6}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;