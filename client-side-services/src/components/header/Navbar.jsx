import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className='navbar navbar-expand-lg bg-secondary-subtle'>
        <div className='container-sm'>
            <div className="header">
                <Link className='navbar-brand fw-bold'>QUOLA</Link>
            </div>
            <ul className='nav ms-auto gap-3'>
                <li className="nav-item">
                    <button type='button' onClick={() => navigate("/login")} className='btn btn-sm btn-dark' >Login</button>
                </li>
                <li className="nav-item">
                    <button className='btn btn-sm btn-outline-dark' >Signup</button>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
