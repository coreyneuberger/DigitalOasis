import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import { DigitalOasis } from './assets'

import {Home, Gallery} from './page'

const App = () => {
  return (
    <BrowserRouter>
    <header className="bg-back w-full flex justify-around items-center sm:px-8 px-4 py-4">
      <Link to="/">
        <img src={DigitalOasis} className='object-scale down w-48 h-48'></img>
      </Link>
      <Link to="/gallery" className='text-onbackground font-bold text[32px] px-4 py-2'>Gallery</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-back min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
