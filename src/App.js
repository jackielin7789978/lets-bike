import { useState, useCallback, useEffect } from 'react';
import GlobalStyle from './constants/globalStyle';
import { THEME } from './constants/styles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Map,
  Routes as RoutesPage,
  Stations,
  NotFound
} from './components/pages';
import { NavContext, ApiContext } from './contexts';
import BikeApi from './webAPIs';

export default function App() {
  // nav
  const [isCardOpen, setIsCardOpen] = useState(false);

  // map
  const [myPosition, setMyPosition] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);

  // data
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCenterCoords = useCallback(() => {
    if (!mapInstance) return;
    const lat = mapInstance.center.lat();
    const lng = mapInstance.center.lng();
    return [lat, lng];
  }, [mapInstance]);

  const bundleStationState = (stationArr, statusArr) => {
    return stationArr.map((station) => {
      const status = statusArr.filter(
        (status) => status.StationUID === station.StationUID
      );
      return {
        ...station,
        status: status[0],
        isViewing: false
      };
    });
  };

  const findNearbyStations = useCallback(() => {
    if (!mapInstance) return;
    const [lat, lng] = getCenterCoords();
    const nearby = `nearby(${lat}, ${lng}, 700)`;

    const axiosOptions = {
      params: {
        $top: 10,
        $spatialFilter: nearby
      }
    };

    (async () => {
      let resStation;
      let resStatus;
      setIsLoading(true);
      try {
        resStation = await BikeApi.get('/Station/NearBy', axiosOptions);
        resStatus = await BikeApi.get('/Availability/NearBy', axiosOptions);
        setStations(() => bundleStationState(resStation.data, resStatus.data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [getCenterCoords, mapInstance]);

  useEffect(() => {
    if (!myPosition) return;
    findNearbyStations();
  }, [findNearbyStations, myPosition]);

  useEffect(() => console.log(stations), [stations]);

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
          setStations,
          findNearbyStations,
          isLoading,
          setIsLoading
        }}
      >
        <NavContext.Provider value={{ isCardOpen, setIsCardOpen }}>
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
  );
}
