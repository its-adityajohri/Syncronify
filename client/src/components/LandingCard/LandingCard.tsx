import React from 'react'

const LandingCard = ({detail}) => {
  return (
    <div className='w-[250px] h-[320px] p-5 bg-gray-100 rounded-2xl truncate whitespace-normal'>
      <div className="flex flex-col gap-5 overflow-hidden">
        <div className="">
          <img src={detail.logo} alt="logo" className=''/>
        </div>
        <h3 className="text-2xl font-semibold">{detail.title}</h3>
        <p className="text-md font-thin h-[100px] truncate whitespace-normal">{detail.description}</p>
        <button className='w-fit border-2 border-gray-700/70 p-1 rounded-lg font-semibold bg-black text-white'>Read More</button>
      </div>
    </div>
  )
}

export default LandingCard