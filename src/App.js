import React from 'react'
import { useGlobalContext } from './context'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
// items

function App() {
  const {loading} = useGlobalContext();
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<CartContainer/>}/>
          <Route path='/success' element={<h1>Success</h1>}/>
          <Route path='/cancel' element={<h1>Cancel</h1>}/>
        </Routes>
      </BrowserRouter>
  
    </main>
  )
}

export default App
