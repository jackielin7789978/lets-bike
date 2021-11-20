import { useState } from 'react'
import GlobalStyle from './constants/globalStyle'
import { THEME } from './constants/styles'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Map,
  Routes as RoutesPage,
  Stations,
  NotFound
} from './components/pages'
import { NavContext } from './contexts'

export default function App() {
  const [navMenu, setNavMenu] = useState('map')
  const [isCardOpen, setIsCardOpen] = useState(false)

  return (
    <Router>
      <NavContext.Provider
        value={{ navMenu, setNavMenu, isCardOpen, setIsCardOpen }}
      >
        <ThemeProvider theme={THEME}>
          <GlobalStyle />
          <Routes>
            <Route path='/' element={<Map />} />
            <Route path='/map' element={<Map />} />
            <Route path='/stations' element={<Stations />} />
            <Route path='/routes' element={<RoutesPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </NavContext.Provider>
    </Router>
  )
}
