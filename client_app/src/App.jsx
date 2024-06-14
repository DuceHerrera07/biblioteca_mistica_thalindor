import React, { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/routerConfig'
import SpinnerComponent from './components/Spinner/SpinnerComponent'
import './theme/main.scss'

function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<SpinnerComponent/>}>
            <AppRouter/>
        </Suspense>
    </BrowserRouter>
  )
}

export default App