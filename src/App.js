import GlobalStyle from './constants/globalStyle'
import { THEME } from './constants/styles'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import {
  Map,
  Routes as RoutesPage,
  Stations,
  NotFound
} from './components/pages'

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/map' element={<Map />} />
          <Route path='/stations' element={<Stations />} />
          <Route path='/routes' element={<RoutesPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Navbar />
      </ThemeProvider>
    </Router>
  )
}
