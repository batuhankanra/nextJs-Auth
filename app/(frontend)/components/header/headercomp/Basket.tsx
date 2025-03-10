import React from 'react'
import { FaShoppingBasket } from 'react-icons/fa'

const Basket:React.FC = () => {
  return (
    <button className='cursor-pointer hover:text-zinc-500 transition-colors duration-200   '>
        <FaShoppingBasket size={28} />
    </button>
  )
}

export default Basket
