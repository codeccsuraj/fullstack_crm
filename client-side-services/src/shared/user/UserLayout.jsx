import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaBars, FaUser, FaCog, FaChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Define your sidebar links dynamically
  const navItems = [
    { path: '', label: 'Account Info', icon: <FaUser /> },
    { path: '/settings', label: 'Settings', icon: <FaCog /> },
    { path: '/reports', label: 'Reports', icon: <FaChartBar /> },
  ]

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <motion.div
        className="sidebar"
        animate={{ width: collapsed ? '60px' : '240px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="sidebar-header">
          {!collapsed && <h4 className="brand">My Account</h4>}
          <button className="btn toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? 'active-link' : 'inactive-link'
                  }`
                }
              >
                <span className="icon">{item.icon}</span>
                {!collapsed && <span className="ms-2">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Content */}
      <motion.div
        className="content"
        animate={{ marginLeft: collapsed ? '60px' : '240px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Outlet />
      </motion.div>
    </div>
  )
}

export default UserLayout
