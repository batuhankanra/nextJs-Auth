'use client'

import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type responseProps={
  msg:string,
  type:string
}
const Register:React.FC = () => {
  const [email,setEmail]=React.useState<string>('')
  const [password,setPassword]=React.useState<string>('')
  const [response,setResponse]=React.useState<responseProps>({msg:'',type:''})
  const [name,setName]=React.useState<string>('')
  const router=useRouter()

  const handleSubmit=async (e:any)=>{
    e.preventDefault()
    try{
      const data={name,email,password}
      await axios.post('http://localhost:3000/api/auth/register',data).then(()=>{
        signIn('credentials',{
          name:data.name,
          email:data.email,
          password:data.password,
          redirect:false
        }).then((callback)=>{
          if(callback?.ok){
            router.push('/')
            router.refresh()
            setResponse({msg:'Kayit olundu',type:'Success'})
          }
          if(callback?.error){
            console.log(callback.error)
          }
        })
      })
      
    }catch (err){
      
        setResponse({msg:err?.response.data.msg,type:'error'})
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen w-full '>
     
    <form  onSubmit={handleSubmit} className='md:w-[800px] flex flex-col items-center gap-5  py-7 border-r border-zinc-600 m-2   '>
     <div className=' text-2xl font-semibold'>Kayit ol</div>

    
      {response.type==='error' && (<p className='flex items-center justify-center bg-red-500 py-3 w-1/2 rounded-md text-lg capitalize'>{response.msg}</p>)}
      {response.type==='success' && (<p className='flex items-center justify-center bg-green-700 py-3 w-1/2 rounded-md text-lg capitalize'>{response.msg}</p>)}
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='E-mail' className='bg-zinc-700 px-2 py-3 outline-none rounded-lg w-1/2 text-lg border border-zinc-700 focus:border-zinc-400 ' />
      <input value={name} onChange={e=>setName(e.target.value )} type="text" placeholder='Isim'  className='bg-zinc-700 px-2 py-3 outline-none rounded-lg w-1/2 text-lg border border-zinc-700 focus:border-zinc-400 ' />
      <input value={password} onChange={e=>setPassword(e.target.value )} type="text" placeholder='Parola'  className='bg-zinc-700 px-2 py-3 outline-none rounded-lg w-1/2 text-lg border border-zinc-700 focus:border-zinc-400 ' />
    
    
      <button type='submit' className='w-1/2 border bg-zinc-700 border-zinc-700 hover:border-zinc-500 transition-all duration-200 cursor-pointer py-2 rounded-md'>kayit ol</button>
      <p>Giris yapmak icin <Link href={'/login'} className='text-indigo-600'>Tiklaniyiz</Link> </p>
        
    </form>
    <div className=''>
      kayit ol
    </div>
  </div>
  )
}

export default Register
