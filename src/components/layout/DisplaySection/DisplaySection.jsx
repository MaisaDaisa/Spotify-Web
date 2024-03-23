import React from 'react'
import AlbumCovers from './AlbumCovers/AlbumCovers.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faUsers, faUser } from '@fortawesome/free-solid-svg-icons'

const DisplaySection = ( {additionalClass }) => {
  return (
    <div className={`w-full h-full flex flex-col p-4 rounded-lg bg-overlay-black ${additionalClass}`}>
        <div className='flex flex-row justify-end'>
            <div className='flex flex-row gap-2'>
                <FontAwesomeIcon icon={faBell} size="lg" style={{color: "#ffffff",}} className='bg-background-pitch-black p-3 rounded-full' />
                <FontAwesomeIcon icon={faUsers} size="lg" style={{color: "#ffffff",}} className='bg-background-pitch-black p-3 rounded-full' />
                <FontAwesomeIcon icon={faUser} size="lg" style={{color: "#ffffff",}} className='bg-background-pitch-black p-3 rounded-full' />
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            <h1>RecentlyListened</h1>
            <div className=' w-full flex flex-row gap-6 overflow-x-auto'>
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
                <AlbumCovers imgSrc={'https://via.placeholder.com/150'} />
            </div>
        </div>
    </div>
  )
}

export default DisplaySection