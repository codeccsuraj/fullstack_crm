import React from 'react'
import Navbar from '../../components/header/Navbar'
import { useSelector } from 'react-redux'
import Home from './Home'

const HomePage = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Home />
  ) : (
    <div className='container-fluid p-0 m-0'>
      <Navbar />
      <div className="container-sm">
        <div className="row p-4">
          <div className="card border-0 outline-0">
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h3 className='display-2 fw-bold text-center'>Empowering Businesses with Intelligent AI Solutions</h3>
                <div className='d-flex justify-content-center gap-3 align-items-center py-4'>
                  <button className='btn btn-sm btn-dark'>Get started</button>
                  <button className='btn btn-sm btn-outline-dark'>Learn more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
