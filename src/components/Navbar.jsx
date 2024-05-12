import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex md:justify-around items-center bg-purple-700 text-black md:text-2xl h-12 text-xl justify-between'>
        <h1 className='mx-2'>ToDoList</h1>
        <ul className='flex md:gap-2'>
            <li className='list-none mx-2'>Home</li>
            <li className='list-none mx-2'>Tasks</li>
            {/* <li className='list-none mx-2'>Finished Tasks</li> */}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
