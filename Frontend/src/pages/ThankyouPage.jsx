import React from 'react'
import { useUser } from '../context/userContext'

const ThankyouPage = () => {

    const { darkTheme } = useUser();
  return (
    <div className={`h-[34rem] flex items-center justify-center ${darkTheme ? 'bg-[#080d1c] text-white' : "bg-[#f9f9f9] text-gray-900" }`}>
        <div className="middle text-center">
            <h1 className='text-4xl mb-5 font-bold'>Thank You for Ordering!</h1>
            <span className='text-xl'>Your order will be delivered soon.</span>
        </div>        
    </div>
  )
}

export default ThankyouPage