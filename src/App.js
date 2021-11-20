import { useState, useCallback, useEffect } from 'react'
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
import { NavContext, ApiContext } from './contexts'
import BikeApi from './webAPIs'

export default function App() {
  const [navMenu, setNavMenu] = useState('map')
  const [isCardOpen, setIsCardOpen] = useState(false)

  const [myPosition, setMyPosition] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)

  const [stations, setStations] = useState([])

  const stationWithStatus = (stationArr, statusArr) => {
    return stationArr.map((station) => {
      const status = statusArr.filter(
        (status) => status.StationUID === station.StationUID
      )
      return {
        ...station,
        status: status[0]
      }
    })
  }

  const getCenterCoords = useCallback(() => {
    if (!mapInstance) return
    const lat = mapInstance.center.lat()
    const lng = mapInstance.center.lng()
    console.log(lat, lng)
    return [lat, lng]
  }, [mapInstance])

  const findNearbyStations = useCallback(() => {
    if (!mapInstance) return
    const [lat, lng] = getCenterCoords()
    const nearby = `nearby(${lat}, ${lng}, 700)`

    const axiosOptions = {
      params: {
        $top: 10,
        $spatialFilter: nearby
      }
    }

    ;(async () => {
      let resStation
      let resStatus
      try {
        resStation = await BikeApi.get('/Station/NearBy', axiosOptions)
        resStatus = await BikeApi.get('/Availability/NearBy', axiosOptions)
        console.log(stationWithStatus(resStation.data, resStatus.data))
        setStations(() => stationWithStatus(resStation.data, resStatus.data))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [getCenterCoords, mapInstance])

  useEffect(() => {
    if (!myPosition) return
    findNearbyStations()
  }, [findNearbyStations, myPosition])

  return (
    <Router>
      <ApiContext.Provider
        value={{
          mapInstance,
          setMapInstance,
          mapApi,
          setMapApi,
          myPosition,
          setMyPosition,
          stations,
          findNearbyStations
        }}
      >
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
      </ApiContext.Provider>
    </Router>
  )
}
