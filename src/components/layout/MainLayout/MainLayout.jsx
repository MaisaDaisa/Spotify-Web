import React from 'react'
import BottomPlayer from './../BottomPlayer/BottomPlayer.jsx'
import SideBar from './../Sidebar/Sidebar.jsx'
import DisplaySection from './../DisplaySection/DisplaySection.jsx'


const MainLayout = () => {
  return (
    <>
        <div className='flex-3 h-full w-full grid grid-cols-11 mb-4 gap-4'>
            <SideBar additionalClass={'col-span-2'}/>
            <DisplaySection additionalClass={'col-span-9'}/>
        </div>
        <BottomPlayer />
    </>
  )
}

export default MainLayout