import { useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function PortalNavbar() {

  return (
    <div>

        <nav className="min-h-12  shadow-md">
            <h1 className="bg-[#071f1d] text-white py-4">Health Care Portal</h1>
            <ul className=' w-full flex bg-[#071f1d] md:justify-center space-x-4 p-4'>
                <li className="">
                    <NavLink to="/pages/healthcareportal/home" className={({ isActive }) =>
                        `block px-3 py-2 rounded-md no-underline text-white text-sm text-white font-bold ${
                        isActive ? 'bg-gray-800' : ''
                        }`
                    }>
                        Home
                    </NavLink>
                </li>
                <li className="">
                    <NavLink to="/pages/healthcareportal/HealthTopics" className={({ isActive }) =>
                        `block px-3 py-2 rounded-md no-underline text-white text-sm text-white font-bold ${
                        isActive ? 'bg-gray-800' : ''
                        }`
                    }>
                        Health Topics
                    </NavLink>
                </li>
                <li className="">
                    <NavLink to="/pages/healthcareportal/services" className={({ isActive }) =>
                        `block px-3 py-2 rounded-md no-underline text-white text-sm text-white font-bold ${
                        isActive ? 'bg-gray-800' : ''
                        }`
                    }>
                        Services
                    </NavLink>
                </li>
                <li className="">
                    <NavLink to="/pages/healthcareportal/contact" className={({ isActive }) =>
                        `block px-3 py-2 rounded-md no-underline text-white text-sm text-white font-bold  ${
                        isActive ? 'bg-gray-800' : ''
                        }`
                    }>
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>

    </div>
  )
}

export default PortalNavbar