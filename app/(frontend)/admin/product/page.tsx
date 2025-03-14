import React from 'react'
import ProductInfo from '../adminComp/ProductInfo'
import ProductAdd from '../adminComp/productAdd'

const ProductPage = () => {
  return (
    <div className='mt-10 md:ml-20 w-full '>
      <h1 className='text-2xl font-semibold '>Product: </h1>
      <div className='mt-10 ml-4 '>
        <ProductInfo />
        <ProductAdd />
      </div>
    </div>
  )
}

export default ProductPage
