import React from 'react'


const ProfileChange = ({name,email,createdAt}:{name:string,email:string,createdAt:string}) => {
   
  return (
    <form className='w-full  p-2 rounded-md flex flex-col items-center justify-center gap-4'>
        
      <input type="text" placeholder={email} className='w-2/3 outline-none border border-zinc-900 p-3 rounded-md text-lg ' />
      <input type="text" placeholder={name} className='w-2/3 outline-none border border-zinc-900 p-3 rounded-md text-lg ' />
      <input type="text" placeholder={createdAt} disabled className='w-2/3 outline-none  p-3 rounded-md text-lg placeholder:text-white ' />
    </form>
  )
}

export default ProfileChange
