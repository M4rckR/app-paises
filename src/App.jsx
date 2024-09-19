import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './views/Sidebar.jsx';
import { Home } from './views/Home.jsx';
import { Vista1 } from './views/Vista1.jsx';
import { Vista2 } from './views/Vista2.jsx';


export const App = () => {
  return (
    <Router>
      <div className='flex flex-col md:flex-row relative'>
        <Sidebar />
        <div  className='md:w-9/12'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vista1" element={<Vista1 />} />
            <Route path="/vista2" element={<Vista2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
