import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <div className="min-h-[86vh]">
      <Manager/>
      </div>
      <Footer/>
    </>
  )
}

export default App
