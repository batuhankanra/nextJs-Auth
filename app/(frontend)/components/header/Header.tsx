

import React from 'react'
import Logo from './headercomp/Logo'
import { menu } from '@/utils/menu';
import Link from 'next/link';
import User from "./headercomp/User";
import Basket from './headercomp/Basket';
import Search from './headercomp/Search';
import { getUserCurrent } from '@/lib/action';



const Header:React.FC = async  () => {
    
  const session =await getUserCurrent()
  
  return (
    <header className='sticky bg-black  border-b border-zinc-700 shadow-2xl  pt-5 p-2 '>
        <div className='flex items-center justify-between container mx-auto'>
          <Logo classname='p-2'/>
          <div className='text-2xl flex items-center gap-x-8'>
            <Search />
            <Basket />
            <User session={session}/>
          </div>
        </div>
        <nav>
          <div className='mt-4 flex items-center justify-between container mx-auto'>
            {menu && menu.map((item)=>(
              <Link href={item.name} className='cursor-pointer p-2 text-lg hover:text-zinc-500  transition-all duration-200 capitalize font-semibold ' key={item.id}>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      
    </header>
  )
}

export default Header
