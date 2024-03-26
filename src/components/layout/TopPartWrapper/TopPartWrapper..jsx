import React from 'react'

const TopPartWrapper = ({ children }) => {
  return (
    <div className='flex-1 flex flex-row h-5/6 w-full gap-4'>
        {children}
    </div>
  )
}

export default TopPartWrapper