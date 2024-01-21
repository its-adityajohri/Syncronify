import React from 'react'
import "./Card.css"

const Card = () => {
  return (
    <>
    <div className = "flex justify-center items-center min-h-screen bg-gray-200 w-full ">
        <div className ="flex flex-col items-center w-60 bg-white rounded-xl">
            <img className = "p-2 w-30 rounded-xl object-cover" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="Description of the image" />
            <div className = "p-3 w-30">
                <h2 className = "font-bold text-large ">Heading</h2>
                <p className = "text-sm text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, perspiciatis. Ipsam accusamus esse illo necessitatibus?</p>
            </div>
            <div className="flex flex-row justify-center item-center p-2 w-full">
                <button className ="text-white bg-sky-500 text-sm px-3 py-1 rounded-md hover:bg-purple-700">Explore</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Card