import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SidebarNavLinks = ({icon, title}) => {
  return (
    <div className='flex flex-row gap-3 justify-center items-center'>
        <FontAwesomeIcon icon={icon} size="2xl" style={{color: "#ffffff",}} className='w-10'/>
        <h1 className='main-text mt-1'>{title}</h1>
    </div>
  )
}

export default SidebarNavLinks