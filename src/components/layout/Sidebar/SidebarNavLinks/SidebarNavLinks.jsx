import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SidebarNavLinks = ({icon, title}) => {
  return (
    <div className='flex flex-row gap-2 justify-center items-center'>
        <FontAwesomeIcon icon={icon} size="lg" style={{color: "#ffffff",}} className='w-10'/>
        <h1 className='main-text text-lg mt-1'>{title}</h1>
    </div>
  )
}

export default SidebarNavLinks