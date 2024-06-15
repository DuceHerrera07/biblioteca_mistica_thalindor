import React, { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/routerConfig'
import SpinnerComponent from './components/Spinner/SpinnerComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './theme/main.scss'
import { SearchProvider } from './Context/SearchContext';

function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<SpinnerComponent/>}>
          <ToastContainer />
          <SearchProvider>
            <AppRouter/>
          </SearchProvider>
        </Suspense>
    </BrowserRouter>
  )
}

export default App