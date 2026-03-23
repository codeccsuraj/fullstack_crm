import React from 'react'
import FieldWrapper from '../../FieldWrapper'
import TextInput from '../../../components/form/TextInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import ButtonInput from '../../../components/form/ButtonInput'
import { createUserSchemaValidation } from '../schema/userSchema'
import { useSelector } from 'react-redux'
import { useAddUserMutation } from '../../../store/api/userApi'
import { useNavigate } from 'react-router-dom'

const MAX_FILE_SIZE = 800 * 1024 // 800KB

const UpdatePersonalInfo = () => {
    const { user } = useSelector((state) => state.auth)
    const [addUser, { isLoading }] = useAddUserMutation()
    const navigate = useNavigate();    // ✅ Convert file to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
    }

    const formik = useFormik({
        initialValues: {
            profilePic: '',
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            maritalStatus: '',
            bio: '',
            shortDescription: ''
        },

        validationSchema: createUserSchemaValidation,

        onSubmit: async (values) => {
            try {
                const payload = {
                    authId: user._id,
                    ...values
                }
                const result = await addUser(payload).unwrap();
                if (result?.success) {
                    alert(result?.message)
                    navigate('/profile')
                }
                console.log("payload", result)
            } catch (error) {
                console.error("Error occurred while adding details", error)
            }
        }
    })

    // ✅ File handler
    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        // ✅ Size validation
        if (file.size > MAX_FILE_SIZE) {
            alert('File size should not exceed 800KB')
            return
        }

        try {
            const base64 = await convertToBase64(file)
            formik.setFieldValue('profilePic', base64)
        } catch (error) {
            console.error("File conversion error:", error)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='mb-3'>
                <h4 className='m-0 p-0'>Update your personal details</h4>
                <span>Please fill all require details <b className='text-danger'>(*)</b></span>
            </div>

            <form onSubmit={formik.handleSubmit} className='row'>

                {/* Profile Picture */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="Select a profile picture">
                        <input
                            type='file'
                            className='form-control'
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </FieldWrapper>
                </div>

                <div className="col-6"></div>

                {/* First Name */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="First Name" name="firstName" required>
                        <TextInput
                            type='text'
                            name='firstName'
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                    </FieldWrapper>
                </div>

                {/* Last Name */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="Last Name" name="lastName">
                        <TextInput
                            type='text'
                            name='lastName'
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                    </FieldWrapper>
                </div>

                {/* DOB */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="Date of birth" name="dob" required>
                        <TextInput
                            type='date'
                            name='dob'
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                        />
                    </FieldWrapper>
                </div>

                {/* Gender */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="Gender" name="gender" required>
                        <Select
                            options={[
                                { label: "Male", value: "MALE" },
                                { label: "Female", value: "FEMALE" },
                                { label: "Other", value: "OTHER" },
                            ]}
                            onChange={(option) =>
                                formik.setFieldValue('gender', option.value)
                            }
                        />
                    </FieldWrapper>
                </div>

                {/* Marital Status */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="Marital Status" name="maritalStatus" required>
                        <Select
                            options={[
                                { label: "Married", value: "MARRIED" },
                                { label: "Single", value: "SINGLE" },
                            ]}
                            onChange={(option) =>
                                formik.setFieldValue('maritalStatus', option.value)
                            }
                        />
                    </FieldWrapper>
                </div>

                {/* Bio */}
                <div className="col-lg-6 mb-2">
                    <FieldWrapper formik={formik} label="Bio" name="bio">
                        <TextInput
                            type='text'
                            name='bio'
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                        />
                    </FieldWrapper>
                </div>

                {/* Short Description */}
                <div className="col-lg-12 mb-2">
                    <FieldWrapper formik={formik} label="Short description" name="shortDescription">
                        <textarea
                            name="shortDescription"
                            className='form-control'
                            rows={4}
                            value={formik.values.shortDescription}
                            onChange={formik.handleChange}
                        />
                    </FieldWrapper>
                </div>

                {/* Submit */}
                <div className='d-flex justify-content-end mt-3'>
                    <ButtonInput
                        type='submit'
                        label='Save changes'
                        className='btn-dark'
                        loading={isLoading}
                    />
                </div>

            </form>
        </div>
    )
}

export default UpdatePersonalInfo