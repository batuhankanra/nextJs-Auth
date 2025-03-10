"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useRef, useState } from 'react'
import { FaUser } from 'react-icons/fa'

interface SessionProps{
  session:any
}

const User:React.FC<SessionProps> =  ({session}) => {
  const [act,setAct]=useState<boolean>(false)
  const dropdownRef=useRef<HTMLDivElement>(null)
  const router=useRouter()
  useEffect(()=>{
    function handleCLick(event:MouseEvent){
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setAct(false)
      }
    }
    document.addEventListener('mousedown',handleCLick)
    return ()=>document.removeEventListener('mousedown',handleCLick)
  },[])

  const handleLogout=()=>{
    signOut()
    router.refresh()
  }

  return (
    <div className='flex items-center gap-x-1   transition-colors duration-200 '>
        {session && (
          <div onClick={()=>setAct(!act)} className=' relative cursor-pointer  '>
            <div className='hover:text-zinc-500 flex items-center gap-x-1'>
              <FaUser />
              <h2>{session?.name} </h2>
            </div>
            <div ref={dropdownRef} className={`absolute top-10 rounded-md -right-16 bg-zinc-600 text-lg w-[200px] gap-y-3 p-2 z-10 text-start  ${act ? 'flex flex-col':'hidden'}`}>
              <Link  href={'/profile'} className=' transition-all duration-200 hover:text-zinc-900 '>Profile</Link>
              <button onClick={()=>handleLogout()} className='transition-all duration-200 hover:text-zinc-900 cursor-pointer text-start'>Cikis yap</button>
            </div>
          </div>
        )}
        {!session && (
          <button className='text-xl relative cursor-pointer '>
            <span onClick={()=>setAct(!act)} className='hover:text-zinc-500'>giris yap</span>
            <div className={`absolute top-10 rounded-md -right-16 bg-zinc-600 text-lg w-[200px] gap-y-3 p-2 z-10 text-start  ${act ? 'flex flex-col':'hidden'}`}>
              <Link href={'/register'} className=' transition-all duration-200 hover:underline '>Kayit Ol</Link>
              <Link href={'/login'} className='transition-all duration-200 hover:underline'>Giris Yap</Link>
            </div>
          </button>
        )}
    </div>
  )
}

export default User
