import React from 'react'

const TopPartWrapper = ({ children }) => {
  return (
    <div className='flex flex-row h-5/6 w-full gap-4 overflow-x-hidden'>
        {children}
    </div>
  )
}

export default TopPartWrapper