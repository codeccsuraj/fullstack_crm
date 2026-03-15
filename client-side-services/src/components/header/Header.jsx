import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { FaUser, FaSearch } from "react-icons/fa";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import Dropdown from "../menu/Dropdown";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        Swal.fire({
            title: "Sign out?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            reverseButtons: true,

            customClass: {
                popup: "custom-swal-popup",
                confirmButton: "custom-confirm-btn",
                cancelButton: "custom-cancel-btn"
            },

            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {

                // dispatch logout action
                dispatch(logout());
                Swal.fire({
                    icon: "success",
                    title: "Logged out",
                    text: "You have been successfully logged out.",
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: {
                        popup: "custom-swal-popup"
                    }
                });
                navigate('/login')
            }
        });
    };
    return (
        <nav className="navbar bg-light shadow-sm px-2 px-md-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand fw-bold m-0">
                    Quola
                </Link>
                {/* Logo */}

                {/* Right Icons */}
                <ul className="nav flex-row align-items-center gap-3">

                    <li className="nav-item">
                        <Link to="/search" className="nav-link text-dark p-0">
                            <FaSearch size={18} />
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/notifications" className="nav-link text-dark p-0">
                            <IoMdNotifications size={20} />
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Dropdown
                            icon={FaUser}
                            items={[
                                { label: "Profile", path: "/profile", icon: FiUser },
                                { label: "Settings", path: "/settings", icon: FiSettings },
                                { label: "Logout", icon: FiLogOut, onClick: handleLogout }
                            ]}
                        />
                    </li>

                </ul>

            </div>
        </nav>
    );
};

export default Header;