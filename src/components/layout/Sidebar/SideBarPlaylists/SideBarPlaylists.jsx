import React from 'react'

const SideBarPlaylists = ({ imgSrc, name, playlistKey, id }) => {
  return (
    <div id={id} key={playlistKey} className='flex flex-row justify-center items-center gap-3'>
        <img src={imgSrc} alt="" className='w-14 h-14 rounded-lg' />
        <h1 className='text-secondary-font text-lg font-lg'>{name}</h1>
    </div>
  )
}

export default SideBarPlaylists
