import React, { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/routerConfig'
import SpinnerComponent from './components/Spinner/SpinnerComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './theme/main.scss'

function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<SpinnerComponent/>}>
          <ToastContainer />
            <AppRouter/>
        </Suspense>
    </BrowserRouter>
  )
}

export default App