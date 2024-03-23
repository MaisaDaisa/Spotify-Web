import React from 'react'

const AlbumCovers = ({imgSrc}) => {
  return (
    <div className='flex flex-col items-start gap-2 flex-shrink-0'>
        <img src={imgSrc} alt="" className='w-40 h-40 rounded-lg' />
        <div className='flex flex-col gap-1'>
            <h1 className='text-default-font text-sm'>Album Name</h1>
            <h1 className='text-secondary-font text-sm'>Artist Name</h1>
        </div>
    </div>
  )
}

export default AlbumCovers