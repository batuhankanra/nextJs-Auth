
import { getUserCurrent } from '@/lib/action'
import { FaUser } from 'react-icons/fa'



const AdminHeader = async () => {
 const session=await getUserCurrent()


  return (
    <div className='fixed top-0 w-full py-5 border-b border-zinc-700  '>
      <div className='w-full flex items-center justify-between container md:ml-20 bg-black/90  '>
        <div>search</div>
        
        <div className='flex items-center p-2 rounded-md text-lg font-semibold gap-x-2 '>
          <FaUser />
          {session?.name}
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
