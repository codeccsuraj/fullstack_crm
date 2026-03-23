import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../../components/loader/PageLoader'
import { FiArrowLeft } from 'react-icons/fi'  // Back icon
import { useGetUserByAuthIdQuery } from '../../store/api/userApi'
import ButtonInput from '../../components/form/ButtonInput'
import { MdOutlineAddCircleOutline } from "react-icons/md";
import dayjs from 'dayjs'

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const { data, isLoading, error } = useGetUserByAuthIdQuery(user?._id)

    if (isLoading) {
        return <PageLoader />
    }

    console.log("object", data)
    return (
        <div className='container-fluid'>
            <div className="bg-white shadow-sm border-bottom mb-4">
                <div className="d-flex align-items-center py-2 px-3">
                    <button type='button' onClick={() => navigate(-1)} className="btn btn-link p-0 me-3 text-decoration-none">
                        <FiArrowLeft size={24} className="text-muted" />
                    </button>
                    <h4 className="mb-0 fw-semibold text-dark">My Account Details</h4>
                </div>
            </div>
            {data?.success ? (
                <div className="row">
                    <div className="col-lg-2 d-flex align-items-center justify-content-center mb-4">
                        <div className="profile">
                            <img src={data?.data?.profilePic || "https://api.dicebear.com/9.x/lorelei/svg"} alt="profile" className='img-thumbnail border rounded-circle' style={{ width : '150px', height : '150px'}} />
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            {[
                                { label: "First Name", value: data?.data?.firstName || "" },
                                { label: "Last Name", value: data?.data?.lastName || "" },
                                { label: "Date of Birth", value: data?.data?.dob ? dayjs(data?.data?.dob).format("DD-MMM-YYYY") : "" || "" },
                                { label: "Marital Status", value: data?.data?.maritalStatus || "" },
                                { label: "Email", value: data?.data?.authId?.email || "" },
                                { label: "Mobile", value: data?.data?.authId?.mobile || "" },
                                { label: "Username", value: data?.data?.authId?.username || "" },
                            ].map((item, idx) => (
                                <div className="col-md-3 mb-4" key={idx}>
                                    <div className="">
                                        <fieldset className="border rounded">
                                            <legend className="px-2 muted">{item.label}</legend>
                                            <span className='px-3 py-2 small'>{item.value}</span>
                                        </fieldset>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='row justify-content-center align-items-center'>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <span className='h5'>Add your profile details</span>
                                    <ButtonInput
                                        type='button'
                                        label={<div className='d-flex justify-content-center align-items-center gap-2'><MdOutlineAddCircleOutline /> Add Details</div>}
                                        className='btn-dark'
                                        onClick={() => navigate(`create-profile`)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile