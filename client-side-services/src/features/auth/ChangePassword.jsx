import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import TextInput from '../../components/form/TextInput'
import ButtonInput from '../../components/form/ButtonInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useChangePasswordMutation } from '../../store/api/authApi'
import { useSelector } from 'react-redux'
import Alert from '../../components/error/Alert'

const ChangePassword = () => {
    const { user } = useSelector((state) => state.auth)
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const [alert, setAlert] = useState({
        message: "",
        type: "success",
    });
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const validationSchema = Yup.object({
        currPassword: Yup.string()
            .required('Current password is required'),

        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('New password is required'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm password is required')
    })

    const formik = useFormik({
        initialValues: {
            currPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema,

        onSubmit: async (values) => {
            try {
                const payload = {
                    oldPassword: values.currPassword,
                    newPassword: values.newPassword,
                    email: user?.email
                }
                const result = await changePassword(payload).unwrap();
                if (result?.success) {
                    setAlert({
                        message: result?.message || "",
                        type: "success",
                    });
                    navigate(from, { replace: true });
                }
            } catch (error) {
                if (!error?.data?.success) {
                    setAlert({
                        message: error?.data?.message || "",
                        type: "danger",
                    });
                }
            }
        }
    })

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
                        Change your password
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

                        {/* Current Password */}
                        <div className="form-group mb-3">
                            <label className='form-label'>Your current password</label>

                            <TextInput
                                type='text'
                                name='currPassword'
                                value={formik.values.currPassword}
                                onChange={formik.handleChange}
                            />

                            {formik.touched.currPassword && formik.errors.currPassword && (
                                <small className="text-danger">
                                    {formik.errors.currPassword}
                                </small>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="form-group mb-3">
                            <label className='form-label'>New password</label>

                            <TextInput
                                type='password'
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                toggleEye={true}
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
                                toggleEye={true}
                            />

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <small className="text-danger">
                                    {formik.errors.confirmPassword}
                                </small>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <ButtonInput
                                type='submit'
                                label='Save changes'
                                className='btn-dark'
                                loading={isLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword