import React from 'react'
import ProductInfo from '../adminComp/ProductInfo'
import CategoryAdd from '../adminComp/categoryAdd'

const ProductPage = () => {
  return (
    <div className='mt-10 md:ml-20 w-full '>
      <h1 className='text-2xl font-semibold '>Category: </h1>
      <div className='mt-10 ml-4 '>
        <ProductInfo />
        <CategoryAdd />
      </div>
    </div>
  )
}

export default ProductPage
