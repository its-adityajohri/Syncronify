import React from 'react'

export interface Props {
  title: string;
}

const Button = (props:Props) => {
  return (
    <div className='bg-gray-950 p-2 m-2 max-w-fit rounded-lg font-semibold text-white outline-none hover:text-black hover:border-2 hover:border-black hover:bg-white'>{props.title}</div>
  )
}

export default Button