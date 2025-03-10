'use client'

import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";

type messageProps={
    msg:string,
    type:string
  }


const ChangePassword =  () => {
    const [old,setOld]=React.useState<string>('')
    const [newp,setNewp]=React.useState<string>('')
    const [agein,setAgein]=React.useState<string>('')
    const [message,setMessage]=React.useState<messageProps>({msg:'',type:''})
    const [hidden,setHidden]=React.useState<boolean>(false)

    const handleForm=async (e:any)=>{
        e.preventDefault()
        setMessage({msg:'',type:''})
        if(!newp || !agein || !old){
            return setMessage({msg:'bos biraktiniz',type:'error'})
        }
        if(newp!=agein){
             return setMessage({msg:'sifreniz ayni degil',type:'error'})
        }
        const data={
            oldPassword:old,
            newPassword:newp
        }
        const response=await axios.post('http://localhost:3000/api/auth/change',data)
        if(response.status===200){
          setMessage({msg:'Sifre degistirme basarili' ,type:'success'})
        }
    }
  return (
    <form onSubmit={handleForm} className='w-full  p-2 rounded-md flex flex-col items-center justify-center gap-4'>
      {message.type==='error' && (
        <div className='w-2/3 bg-red-700 text-lg p-2 rounded-md'>
            {message.msg}
        </div>
      )}
      {message.type==='success' && (
        <div className='w-2/3 bg-green-700 text-lg p-2 rounded-md'>
            {message.msg}
        </div>
      )}
        <div className='flex items-center justify-center relative w-2/3'>
          <input type={hidden ? 'text' : 'password'} placeholder='Mevcut Parola'   className='w-full outline-none border border-zinc-900 p-3 rounded-md text-lg ' value={old} onChange={e=>setOld(e.target.value)} />
          <button className='absolute right-4  text-2xl' type='button' onClick={()=>setHidden(!hidden)}>{hidden ?   <FaRegEyeSlash /> :<FaRegEye />}</button>
        </div>
        <input  type={hidden ? 'text' : 'password'} placeholder='Yeni Parolo'     className='w-2/3 outline-none border border-zinc-900 p-3 rounded-md text-lg ' value={newp} onChange={e=>setNewp(e.target.value)} />
        <input  type={hidden ? 'text' : 'password'} placeholder='Tekrar Parola'   className='w-2/3 outline-none border border-zinc-900 p-3 rounded-md text-lg ' value={agein} onChange={e=>setAgein(e.target.value)}  />
        <button type='submit' className='w-2/3 p-2 rounded-md cursor-pointer bg-zinc-500 hover:bg-zinc-700'>Degistir</button>
      <p className='w-2/3 text-start'>Sifreni unuttun ise <Link  className='text-indigo-700' href={'/'}>tikla</Link></p>
    </form>
  )
  
}

export default ChangePassword
