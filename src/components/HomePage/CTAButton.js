import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, linkto, active}) => {
  return (
    <Link to={linkto}>

      <div className={`text-center text-[16px] px-6 py-3 rounded-md
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
        hover:scale-105 transition-transform duration-300`}>
        {children}
      </div>

    </Link>
  )
}

export default CTAButton
