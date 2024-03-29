import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-primary bg-opacity-80'>
        <div className='w-16 h-16 border-8 border-white border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Spinner;