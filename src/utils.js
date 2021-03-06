export const convertServiceStatus = (statusCode) => {
  switch (statusCode) {
    case 0:
      return '停止營運';
    case 2:
      return '暫停營運';
    default:
      return '正常營運';
  }
};

export const convertServiceType = (typeCode) => {
  if (typeCode === 1) return 'YouBike 1.0';
  return 'YouBike 2.0';
};

export const handleNavigate = (stationData) => {
  const coordsString = `${String(
    stationData.StationPosition.PositionLat
  )}, ${String(stationData.StationPosition.PositionLon)}`;
  window.open(
    `https://www.google.com.tw/maps/place/${coordsString}`,
    '_blank',
    'noopener, noreferrer'
  );
};
