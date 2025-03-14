'use client'
import React from 'react'
import { CategoryRotate } from '@/lib/enumCategory'
import axios from 'axios'


const CategoryAdd = () => {
  const [name,setName]=React.useState<string>('')
  const [selected,setSelected]=React.useState<string>('')
  const [isOpen,setIsOpen]=React.useState<boolean>(false)
  const dropDownRef=React.useRef<HTMLDivElement>(null)

  React.useEffect(()=>{
      function HandleClick(event:MouseEvent){
        if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown',HandleClick)
      return ()=>document.removeEventListener('mousedown',HandleClick)
    })
    const handleButton=(e:string)=>{
      setSelected(e)
      setIsOpen(false)
    }
    const handleSubmit=async (e:any)=>{
      e.preventDefault()
      const parse=CategoryRotate.find(x=>x.name===selected)

      const data={
        name,
        parseInt:`${parse?.parseInt}-`
      }
      const response =await axios.post('http://localhost:3000/api/admin/category',data)
      console.log(response)
    }
  return (
    <div className='w-full  '>
        <h1 className='text-xl font-medium'>Category Add:</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center justify-center w-full ' >
            <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='Category Name' className='w-1/3 border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg'/>
            <div ref={dropDownRef} className='w-1/3 relative'>
              <input type="text" placeholder='Category Segment' value={selected} readOnly onClick={()=>setIsOpen(!isOpen)}  className='w-full cursor-pointer border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg' />
              {isOpen && (
                <div className='w-full bg-black border my-4 border-zinc-700 py-2 px-1 absolute' >
                  {CategoryRotate.map(cat=>(
                    <button key={cat.id} type='button' onClick={()=>handleButton(cat.name)} className='my-1  text-lg w-full hover:bg-zinc-800 cursor-pointer py-2 rounded-md'>
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className='bg-zinc-900 hover:bg-zinc-800 w-1/3 px-1 py-2 rounded-lg cursor-pointer' type='submit'>Send</button>
        </form>
    </div>
  )
}

export default CategoryAdd
