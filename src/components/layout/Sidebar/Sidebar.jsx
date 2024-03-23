import React from 'react'
import NasPhoto from './../../../assets/images/nas.jpg'
import SidebarNavLinks from './SidebarNavLinks/SidebarNavLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faStar } from '@fortawesome/free-regular-svg-icons'
import SideBarPlaylists from './SideBarPlaylists/SideBarPlaylists'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({additionalClass}) => {
  return (
    <div className={`flex flex-col items-start h-full gap-6 bg-overlay-black rounded-2xl p-8 ${additionalClass}`}>
         <SidebarNavLinks icon={faBuilding} title={"Home"}/>
        <SidebarNavLinks icon={faCompass} title={"Explore"}/>
        <SidebarNavLinks icon={faStar} title={"Favorites"}/>
        <div className='w-full flex flex-col items-start mt-5 gap-7 '>
          <h1 className='text-default-font text-2xl font-lg'>Your library</h1>
          <div className='flex flex-col flex-nowrap items-start gap-5'>
          <SideBarPlaylists imgSrc={NasPhoto} name={"CAR PLAYLIST"}/>
          <SideBarPlaylists imgSrc={NasPhoto} name={"RAP BANGERS"}/>
          <SideBarPlaylists imgSrc={NasPhoto} name={"SAD DAY AFTER SCHOOL"}/>
          <SideBarPlaylists imgSrc={NasPhoto} name={"IDK"}/>
          </div>
        </div>
    </div>
  )
}

export default Sidebar