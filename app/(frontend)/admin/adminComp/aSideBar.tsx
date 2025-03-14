'use client'
import React, { useEffect } from 'react'
import Logo from '../../components/header/headercomp/Logo'
import Link from 'next/link'
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { TbCategoryMinus } from "react-icons/tb";

const ASideBar:React.FC = () => {
  const [isOpen,setIsOpen]=React.useState<boolean>(false)
  const dropDownRef=React.useRef<HTMLDivElement>(null)
  useEffect(()=>{
    function HandleClick(event:MouseEvent){
      if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown',HandleClick)
    return ()=>document.removeEventListener('mousedown',HandleClick)
  })

  return (
    <div ref={dropDownRef} className={` text-white  border-r border-zinc-700 left-0   p-5 transition-all ${isOpen ? "w-64" : 'w-16'} cursor-pointer overflow-hidden bg-black h-full fixed z-50 hidden md:block `}>
      <div  className='flex items-center gap-x-2 '>
        <button className='cursor-pointer' onClick={()=>setIsOpen(!isOpen)}><IoMenu size={24} />  </button>    
        <Logo classname={`${isOpen ? 'block' : 'hidden'} `} link='/admin' />
      </div>    
      <nav  className='  flex flex-col  gap-y-5 mt-10 text-xl font-medium '>
        <Link className='hover:text-zinc-600 transition-all duration-200 flex items-center gap-x-2' href={'/admin/'}><IoHomeSharp /> <span className={`${isOpen ? 'block' : 'hidden'}`}>DashBoard</span> </Link>
        <Link className='hover:text-zinc-600 transition-all duration-200 flex items-center gap-x-2' href={'/admin/product'}><MdOutlineProductionQuantityLimits/> <span className={`${isOpen ? 'block' : 'hidden'}`}>Product</span></Link>
        <Link className='hover:text-zinc-600 transition-all duration-200 flex items-center gap-x-2' href={'/admin/category'}><TbCategoryMinus/> <span className={`${isOpen ? 'block' : 'hidden'}`}>Category</span></Link>
      </nav>
    </div>
  )
}

export default ASideBar
