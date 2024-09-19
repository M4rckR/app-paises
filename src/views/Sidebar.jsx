import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <nav className="bg-m-purple md:w-3/12 p-4 w-full md:min-h-[100vh] ">
      <div className="text-white text-3xl mb-6">Marck</div>
      <ul className='flex md:flex-col gap-4'>
        <li className='flex-1'>
          <Link 
            className='text-white bg-m-purple-light py-2 px-4 block rounded-lg hover:bg-m-purple-dark active:bg-m-purple-darker hover:border-white border-transparent border transition-all duration-200 text-center' 
            to="/">Home</Link>
        </li>
        <li className='flex-1'>
          <Link 
            className='text-white bg-m-purple-light py-2 px-4 block rounded-lg hover:bg-m-purple-dark active:bg-m-purple-darker hover:border-white border-transparent border transition-all duration-200 text-center' 
            to="/vista1">Vista 1</Link>
        </li>
        <li className='flex-1'>
          <Link 
            className='text-white bg-m-purple-light py-2 px-4 block rounded-lg hover:bg-m-purple-dark active:bg-m-purple-darker hover:border-white border-transparent border transition-all duration-200 text-center' 
            to="/vista2">Vista 2</Link>
        </li>
      </ul>
    </nav>
  )
}
