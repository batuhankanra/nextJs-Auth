"use client"

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { usecategory } from '../context/CategoryContext'
import { CategoryProps } from '../../adminComp/categoryInfo'
import axios from 'axios'



const CategorySetting:React.FC = () => {
  const router=useRouter()
  
  const params =useParams()
  const [name,setName]=React.useState<string>('')
  const {categories,infoCategory}=usecategory()
  React.useEffect(()=>{
    infoCategory()
  },[])
 
  const findCat=categories.find((x:CategoryProps)=>x.id===String(params?.slug))
     console.log(findCat)
     
  const submitHandle=async (e:any)=>{
    e.preventDefault()
    const data={
      name,
      id:findCat?.id
    }
    const response =await axios.put(`http://localhost:3000/api/admin/category/update`,data)
    if(response.status===200){
      router.refresh()
      router.push('/admin/category')
    }

    
  }
  return (
    <div className='container mt-5 mx-auto'>
      <h1 className='text-2xl'>Update: {findCat?.name}</h1>
      <form onSubmit={submitHandle} className='flex flex-col w-full items-center mt-10 gap-y-5' >
        <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder={`change name "${findCat?.name}"`} className='w-1/3 border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg' />
        <div className='flex gap-x-2 items-center'>
        parentId:<span className='text-lg'>{findCat?.parentId}</span>
        <button type='submit' className='p-3 bg-zinc-700 duration-200 cursor-pointer rounded-md hover:bg-zinc-800'>Update</button>

        </div>
      </form>
    </div>
  )
}

export default CategorySetting
