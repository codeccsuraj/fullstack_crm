import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../../store/api/authApi'
import PageLoader from '../../components/loader/PageLoader'
import { FiArrowLeft } from 'react-icons/fi'  // Back icon

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const { data, isLoading, error } = useGetUserQuery(user?._id)

    if (isLoading) {
        return <PageLoader />
    }

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
            <div className="row">
                <div className="col-lg-2">
                    <div className="profile">
                        <img src="https://api.dicebear.com/9.x/lorelei/svg" alt="profile" className='img-fluid border rounded-circle' />
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        {[
                            { label: "Email", value: data?.data?.email || "" },
                            { label: "Mobile", value: data?.data?.mobile || "" },
                            { label: "Username", value: data?.data?.username || "" },
                        ].map((item, idx) => (
                            <div className="col-md-3 mb-2" key={idx}>
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
        </div>
    )
}

export default UserProfile