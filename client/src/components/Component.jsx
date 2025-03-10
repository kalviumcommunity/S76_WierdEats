import React from 'react'
import foodComcination from '../assets/images/foodcombinations.jpg'
const Component = () => {
  return (
    <>
        <div className='flex justify-center items-center h-screen bg-gray-100'>
          <div className='bg-white p-8 rounded shadow-2xl w-80 h-[450px] flex flex-col justify-center items-center'>
            <img src={foodComcination} alt="" />
            <h1 className='text-black  text-[25px] relative z-10 font-bold p-1'>Nuttella + Pizza</h1>
            <p className='text-black text-[13px] relative z-10 font-semibold p-1 text-center'>Nutella + Pizza is a sweet and savory fusion that combines the rich, chocolatey hazelnut spread of Nutella with the crispy, slightly chewy texture of pizza crust. This unique pairing is often made by spreading Nutella over a freshly baked pizza base, sometimes topped with sliced bananas, strawberries, crushed nuts, or even a dusting of powdered sugar.</p>
          </div>
        </div>
    </>
  )
}

export default Component
