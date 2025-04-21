import React from 'react'
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex size-full h-screen items-center justify-center gap-3 text-white">
        <Image
            src="/assets/icons/loader.svg"
            alt="Loader"
            width={32}
            height={32}
            className="animate-spin" 
            />
    </div>
   
  )
}

export default Loader