
import React from 'react'
import AdminHeader from './adminComp/aheader'
import ASideBar from './adminComp/aSideBar'
import { getUserCurrent } from '@/lib/action'

const AdminLayout =  async ({children}: Readonly<{children: React.ReactNode}>)  => {  
  return (
    <div className='flex h-screen '>
      <ASideBar />
      <div className='flex flex-col w-full   '>
        <AdminHeader />
        <div className='mt-18 w-full  '>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
