
import AdminHeader from './adminComp/aheader'
import ASideBar from './adminComp/aSideBar'
import { CategoryProvider } from './category/context/CategoryContext'

const AdminLayout =  async ({children}: Readonly<{children: React.ReactNode}>)  => {  
  return (
    <div className='flex h-screen '>
      <ASideBar />
      <div className='flex flex-col w-full   '>
        <AdminHeader />
        <div className='mt-18 w-full  '>
          <CategoryProvider>
          {children}
          </CategoryProvider>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
