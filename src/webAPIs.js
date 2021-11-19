import axios from 'axios'
import jsSHA from 'jssha'
import { API_ID, API_KEY } from './key'

const BASE_URL = 'https://ptx.transportdata.tw/MOTC/v2/Bike'

const getAuthorizationHeader = () => {
  const AppID = API_ID
  const AppKey = API_KEY
  const GMTString = new Date().toGMTString()
  const ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}

const BikeApi = axios.create({
  headers: getAuthorizationHeader(),
  baseURL: BASE_URL
})

export default BikeApi
