import React from 'react'

const Footer = () => {
  return (
    <div className='w-full fixed bottom-0 left-0 right-0 p-4'>
        <div>
            <div className='flex gap-2 justify-end'> 
                <div className='w-3 h-3 rounded-full  bg-red-500'></div>
                <div className='w-3 h-3 rounded-full  bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full  bg-green-500'></div>
            </div>
        </div>
    </div>
  )
}

export default Footer