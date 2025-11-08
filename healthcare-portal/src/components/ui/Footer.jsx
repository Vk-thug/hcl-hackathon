import React from 'react'
import { NavLink } from 'react-router'


function Footer() {
  return (
    <ul className="flex justify-center space-x-6 bg-gray-200 py-4 mt-10 text-black">
        <li className="">
            <NavLink to='../../pages/legalpages/privacypolicy'>
                Privacy Policy
            </NavLink>
        </li>
        <li className="">
            <NavLink to='../../pages/legalpages/termsandconditions'>
                Terms & Conditions
            </NavLink>
        </li>
        <li className="">
            <NavLink to='../../pages/legalpages/cookies'>
                Cookies Policy
            </NavLink>
        </li>
    </ul>

    
  )
}

export default Footer