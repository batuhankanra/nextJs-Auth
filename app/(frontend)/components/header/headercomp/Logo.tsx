import Link from 'next/link';
import React from 'react'
import { PiTriangleDashedFill } from "react-icons/pi";

interface Props{
  classname:string
}

const Logo:React.FC<Props> = ({classname}) => {
  
  return ( 
    <Link href={'/'} className={`flex items-center justify-center text-4xl  cursor-pointer  text-zinc-900   dark:text-zinc-200 hover:text-zinc-500 transition-all  ease-in ${classname}`}>
      <h1 className=' '>B</h1>
      <div className=" flex items-center gap-x-0.5 pl-1">
      <PiTriangleDashedFill className='' />
      <h1>TUHAN</h1>
      </div>
    </Link>
  )
}

export default Logo
