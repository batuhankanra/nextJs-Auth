'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileChange from './profileCompenents/profile'
import moment from 'moment'
import ChangePassword from './profileCompenents/changePassword'

 export interface SessionProps{
  name:string,
  email:string,
  role:string,
  createdAt:string,
  updatedAt:string,
  emeilVerified:string|null |undefined
}

const Profile:React.FC<SessionProps>= ({session}:any) => {
  const [section,setAction]=React.useState<string>('')

  const router=useRouter()
  if(!session){
    router.push('/login')
    router.refresh()
  }
  console.log(session.role)
  return (
    <div className='container mx-auto'>
      <div className='w-full flex flex-col '>
          <div className='w-full border-b border-zinc-600'>
            <h3 className='p-8 text-3xl  font-semibold'>Profil</h3>
          </div>
          <div className='flex md:flex-row flex-col items-center justify-center mt-15 gap-x-2  '>
            <nav className='md:w-1/3 w-full  p-3 flex flex-col items-center gap-4 bg-zinc-900 rounded-md'>
              <button onClick={()=>setAction('profile')} className={`hover:bg-zinc-700 w-full rounded-md py-2 pl-1 flex items-start ${section ==='profile' ? 'bg-zinc-700' : ''}`}>Profil duzenle</button>
              <button onClick={()=>setAction('emailVerified')} className={`hover:bg-zinc-700 w-full rounded-md py-2 pl-1 flex items-start ${section ==='emailVerified' ? 'bg-zinc-700' : ''}`}>Email dogrulama</button>
              <button onClick={()=>setAction('passwordChange')} className={`hover:bg-zinc-700 w-full rounded-md py-2 pl-1 flex items-start ${section ==='passwordChange' ? 'bg-zinc-700' : ''}`}>Sifre Degistir</button>
             
            </nav>
            <div className='md:w-2/3 w-full  p-1 '>
             {section ==='profile' && <ProfileChange name={session.name} email={session.email} createdAt={moment(session.createdAt).format('DD-MM-YYYY')} />}
             {section ==='passwordChange' && <ChangePassword />}
            </div>

          </div>
      </div>
    </div>
  )
}

export default Profile
