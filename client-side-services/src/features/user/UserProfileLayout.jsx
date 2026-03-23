import React from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

const UserProfileLayout = () => {
    const navigate = useNavigate();
    return (
        <div className='contaner-fluid bg-secondary'>
            <div className="bg-white shadow-sm border-bottom mb-4">
                <div className="d-flex align-items-center py-2 px-3">
                    <button type='button' onClick={() => navigate('/profile')} className="btn btn-link p-0 me-3 text-decoration-none">
                        <FiArrowLeft size={24} className="text-muted" />
                    </button>
                    <h4 className="mb-0 fw-semibold text-dark">Update your profile details</h4>
                </div>
            </div>
            <div className="row p-3">
                <div className="col-3">
                    <nav>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <NavLink
                                    to=""
                                    className={({ isActive }) =>
                                        `nav-link rounded fw-semibold ${isActive
                                            ? "bg-light text-dark"
                                            : "text-dark"
                                        }`
                                    }
                                >Personal Details</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-9">
                    <div className='bg-secondary-subtle p-3 rounded'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileLayout
