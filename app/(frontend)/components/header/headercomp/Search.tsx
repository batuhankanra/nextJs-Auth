import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Search:React.FC = () => {
  return (
    <div className='md:w-[400px]   relative flex items-center justify-end'>
        <input   type="text"  className={` hidden md:flex bg-zinc-600 rounded-full px-3  w-full   transition-all duration-300  focus:border-zinc-400 border border-zinc-600 py-2 outline-none text-lg  `} />
        <button   className='md:absolute right-1 top-0 cursor-pointer flex items-center p-3 '><FaSearch size={20} /></button>
    </div>
  )
}

export default Search
