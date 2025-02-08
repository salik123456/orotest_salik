
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Global/components/Home'
import Dashboard from './Global/components/Dashboard'

function App() {


  return (
    <>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>


      </div>



    </>
  )
}

export default App
