import React, { useEffect } from 'react'
import { GetSeveralBrowseCategories } from '../../../../../lib/API/getInfo'

const MainExplore = () => {
    const [categories, setCategories] = React.useState([])

    useEffect(() => {
        GetSeveralBrowseCategories().then((response) => {
            setCategories(response)
        })
    }
    , [])

    useEffect(() => {
        if (!categories.categories) return;
        let reachedBottom = false;

        document.querySelector(".given-categories").addEventListener('scroll', () => {
            if (!reachedBottom && (window.scrollY + window.innerHeight >= document.body.scrollHeight)) {
                reachedBottom = true;
                GetSeveralBrowseCategories(categories.categories.next).then((response) => {
                    reachedBottom = false;
                });
            }
        });
        
    }, [categories])

  return (
    <div className='given-categories p-6 mt-4 rounded-lg overflow-y-scroll spotify-vertical-scrollbar'>
        <h1 className='text-2xl font-semibold'>Browse All</h1>
        <div className="flex flex-wrap flex-row justify-between gap-6 mt-4">
            { categories.categories ? categories.categories.items.map((category) => {
                return (
                    <div key={category.id} className={`rounded-lg relative w-[200px] h-[200px]` }>
                        <h2 className='absolute top-4 left-4 text-xl font-bold'>{category.name}</h2>
                        <div className='w-full h-full'>
                            <img src={category.icons[0].url} alt={category.name} className='rounded-2xl'/>
                        </div>
                    </div>
                )
            }) : <div></div> }
        </div>
    </div>
  )
}

export default MainExplore