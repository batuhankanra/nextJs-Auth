"use client"


import React from 'react'
import { CategoryProps } from '../../adminComp/categoryInfo'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface CategoryContextType{
    categories:CategoryProps[]
    oneGet:(id:string)=>void
    infoCategory:()=>void
    addCategory:(category:CategoryProps)=>void
    removeCategory:(id:string)=>void
}

const CategoryContext=React.createContext<CategoryContextType | undefined | null>(undefined)

export const CategoryProvider = ({children}:{children:React.ReactNode}) => {
  const router=useRouter()
    const [categories,setCategories]=React.useState<CategoryProps[]>([])


    const infoCategory=async ()=>{
        try{
          const response =await axios.get('http://localhost:3000/api/admin/category/All')
          setCategories(response.data)
        }catch(err){
          console.log(err)
        }
    }
    const oneGet=async (id:string)=>{
      const response=await axios.get(`http://localhost:3000/api/admin/category/${id}`)
      setCategories(response.data)
    }
    const addCategory= async (category:CategoryProps)=>{
        const response =await axios.post(`http://localhost:3000/api/admin/category/${category.id}`)
        
        setCategories(response.data)
    }
    const removeCategory=async (id:string)=>{
      const response =await axios.delete(`http://localhost:3000/api/admin/category/delete`,{data:{id}})
      if(response.status===200){
        router.refresh()
        router.push('/admin/category')
      }

    }

  return (
    <CategoryContext.Provider value={{categories,addCategory,removeCategory,infoCategory,oneGet}}>
      {children}
    </CategoryContext.Provider>
  )
}


export const  usecategory=()=>{
    const context=React.useContext(CategoryContext)
    if(!context){
        throw new Error('useCategory must be used within a CategoryProvider')
    }
    return context
}
