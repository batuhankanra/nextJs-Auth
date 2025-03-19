import React from 'react'
import CategoryInfo from '../adminComp/categoryInfo'

const ProductPage = () => {
  return (
    <div className='mt-10 md:ml-20 w-full max-w-[1800px] overflow-hidden '>
      <h1 className='text-2xl font-semibold '>Category: </h1>
      <div className='mt-10 ml-4 '>
        <CategoryInfo />
      </div>
    </div>
  )
}

export default ProductPage
