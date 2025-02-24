import React from 'react'
import features from '../data/Features'
import {motion} from 'motion/react'
const FeatureComponent = () => {
  return (
    <div className='flex justify-center items-center mt-2 flex-col'>
        <h1 className='text-black font-julee text-[38px] relative z-10 font-bold p-2'>Feature:</h1>
        <div className='flex flex-row justify-around items-center gap-8 mt-3'>
            {features.map((feature) =>(
                <motion.div initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}  className='w-[240px] h-[280px] bg-[#6948DF] p-4 rounded-xl flex flex-col justify-center items-center shadow-lg shadow-black' >
                    <img
                    className='w-[210px] h-[120px] object-fit p-2' 
                    src={feature.img} alt="" />
                    <div className='w-[210px] h-[140px] text-center'>
                        <p className='font-bold text-[15px] '>{feature.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default FeatureComponent