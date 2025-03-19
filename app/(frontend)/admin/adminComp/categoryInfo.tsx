"use client"
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'

import React from 'react'
import { usecategory } from '../category/context/CategoryContext'

export interface CategoryProps{
  id:string,
  name:string,
  parentId:string,
  user:User,
  createdAt:string,
  updatedAt:string
}
interface User{
  name:string
}

const CategoryInfo = () => {
  moment.locale('TR')
  const {categories,infoCategory,removeCategory}=usecategory()
  const [response,setResponse]=React.useState<CategoryProps[]>([])

    React.useEffect(()=>{
      infoCategory()
    },[])


    const hadleButton=(e:CategoryProps)=>{
      const existCategories=categories.filter(x=>x.parentId.split('-')[0].includes(e.parentId))

      setResponse(existCategories)

    }
  return (
    <div className=' flex items-center flex-col gap-y-10 '>
      <div className=' flex items-center w-[1200px] justify-end mr-20  '>
        <Link href={'/admin/category/Add'} className='bg-green-600 p-3 rounded-md'>Category Add</Link>
      </div>
      <table className=' md:w-[1200px] border border-zinc-800  '>
        <thead className='bg-zinc-900 '>
            <tr>
                <th className='py-2  text-center'>id</th>
                <th className='py-2  text-center'>Category Name</th>
                <th className='py-2  text-center'>parseId</th>
                <th className='py-2  text-center'>Created Date</th>              
                <th className='py-2  text-center'>Updated Date</th>  
                <th className='py-2  text-center'>Created By</th>    
                <th className='py-2  text-center'>Setting</th>    
                        
            </tr>
        </thead>
        <tbody>
          {categories && categories.filter((res:any)=>!res.parentId.includes('-')).map((cat:CategoryProps)=>(
             <tr className='hover:bg-zinc-800' key={cat.id}>
              <td className='px-3 py-2 border text-center border-zinc-900' >{cat.id}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{cat.name}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{cat.parentId}</td>  
              <td className='px-3 py-2 border text-center border-zinc-900'>{`${moment(cat.createdAt).format('LLL')}`}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{`${moment(cat.updatedAt).format('LLL')}`}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{cat.user.name}</td>
              <td className='flex items-center gap-x-2 px-3 py-2'>
                <Link href={`/admin/category/${cat.id}`} className='cursor-pointer bg-indigo-700 rounded-md p-2'>Edit</Link>
                <button onClick={()=>removeCategory(cat.id)} className='cursor-pointer bg-red-700 rounded-md p-2'>delete</button>
                <button className='cursor-pointer bg-green-700 rounded-md p-2' onClick={()=>hadleButton(cat)}>Down</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {response.length>0 && (
        <table className=' md:w-[1200px] border border-zinc-800  '>
        <thead className='bg-zinc-900 '>
            <tr>
                <th className='py-2  text-center'>id</th>
                <th className='py-2  text-center'>Category Name</th>
                <th className='py-2  text-center'>parseId</th>
                <th className='py-2  text-center'>Created Date</th>              
                <th className='py-2  text-center'>Updated Date</th>  
                <th className='py-2  text-center'>Created By</th>    
                <th className='py-2  text-center'>Setting</th>    
                        
            </tr>
        </thead>
        <tbody>
          { response.map(cat=>(
             <tr className='hover:bg-zinc-800 ' key={cat.id}>
              <td className='px-3 py-2 border text-center border-zinc-900' >{cat.id}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{cat.name}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{cat.parentId}</td>  
              <td className='px-3 py-2 border text-center border-zinc-900'>{`${moment(cat.createdAt).format('LLL')}`}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{`${moment(cat.updatedAt).format('LLL')}`}</td>
              <td className='px-3 py-2 border text-center border-zinc-900'>{cat.user.name}</td>
              <td className='flex items-center gap-x-2 px-3 py-2'>
                <Link href={`/admin/category/${cat.id}`} className='cursor-pointer bg-indigo-700 rounded-md p-2'>Edit</Link>
                <button onClick={()=>removeCategory(cat.id)} className='cursor-pointer bg-red-700 rounded-md p-2'>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
}

export default CategoryInfo
