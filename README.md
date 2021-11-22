# 2021 the F2E 挑戰賽 Week2 - Let's BIKE

> [網站連結](https://lets-bike.netlify.app/)

## Introduction

使用 React 實作公共自行車站點資訊網，可使用地圖介面查看附近 YouBike 租借站點及相關資訊。資訊是串接交通部 TDX API 取得。

> [MOTC Transport API V2](https://ptx.transportdata.tw/MOTC?t=Bike&v=2#/)

## Feature

- [x] 依據定位顯示附近的 Ubike 站
- [x] 依據地圖中心位置顯示附近的 Ubike 站
- [x] 點擊站點圖標查看單車站資訊 (可租還車數、地址、服務狀態等等)
- [x] 點擊「前往導航」開啟 Google Map
- [ ] 搜尋車站
- [ ] 搜尋單車路線

## 使用技術及第三方套件

- React - Function Components + Hooks
- Creat React App
- [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview)
- [Styled Components](https://styled-components.com/)
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- [google-map-react](https://www.npmjs.com/package/google-map-react)
- [axios](https://www.npmjs.com/package/axios)

## 如何執行

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
