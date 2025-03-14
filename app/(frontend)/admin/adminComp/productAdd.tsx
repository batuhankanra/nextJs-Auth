import React from 'react'

const ProductAdd = () => {
  return (
    <div className='w-full  '>
        <h1 className='text-xl font-medium'>Product Add:</h1>
        <form className='flex flex-col gap-y-4 items-center justify-center w-full ' >
            <input type="text" placeholder='Product Name' className='w-1/3 border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg'/>
            <input type="text" placeholder='Description' className='w-1/3 border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg' />
            <input type="number" placeholder='Price' className='w-1/3 border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg' />
            <input type="text" placeholder='kategori' className='w-1/3 border border-zinc-800 focus:border-zinc-600 outline-none py-3 px-2 text-lg' />
            <input type="file"  />
            <button>Send</button>
        </form>
    </div>
  )
}

export default ProductAdd
