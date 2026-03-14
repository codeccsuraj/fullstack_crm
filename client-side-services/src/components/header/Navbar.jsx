import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ButtonInput from '../form/ButtonInput';

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
                        <ButtonInput
                            label='Login'
                            type='button'
                            onClick={() => navigate('/login')}
                            className='btn-sm'
                        />
                    </li>
                    <li className="nav-item">
                        <ButtonInput
                            label='Register'
                            type='button'
                            onClick={() => navigate('/register')}
                            className='btn-sm btn-dark'
                        />                
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
