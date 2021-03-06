import { useState, useContext, useEffect } from 'react';
import { NavContext, ApiContext } from '../contexts';
import styled from 'styled-components';
import { FONT_SIZE } from '../constants/styles';
import { ICONS } from '../assets/Icons';
import {
  convertServiceStatus,
  convertServiceType,
  handleNavigate
} from '../utils';

const Container = styled.div`
  width: 100%;
  line-height: 2rem;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.blue};
  position: relative;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.light};
`;
const Info = styled.div`
  color: ${({ theme }) => theme.grey500};
  font-size: ${FONT_SIZE.xs};
`;
const Status = styled.span`
  color: ${({ theme }) => theme.success};
  margin-right: 12px;
`;
const Bikes = styled.div`
  button {
    padding: 8px 12px;
    border-radius: 8px;
    margin-right: 8px;
    background: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.blue100};
    font-size: ${FONT_SIZE.sm};
    span {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
const LocationICON = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Card({ station }) {
  return (
    <Container>
      <Title>{station.StationName.Zh_tw}</Title>
      <Info>
        <div>
          <Status>
            ● {convertServiceStatus(station.status.ServiceStatus)}
          </Status>
          <span>
            {convertServiceType(station.ServiceType)} | 總數：
            {station.BikesCapacity}
          </span>
        </div>
        <div>{station.StationAddress.Zh_tw}</div>
      </Info>
      <Bikes>
        <button>
          <span>{station.status.AvailableRentBikes}</span> 可租
        </button>
        <button>
          <span>{station.status.AvailableReturnBikes}</span> 可還
        </button>
      </Bikes>
      <LocationICON onClick={() => handleNavigate(station)}>
        <ICONS.Address />
      </LocationICON>
    </Container>
  );
}

const MenuContainer = styled.div`
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 48px;
  padding: 20px;
  background: ${({ theme }) => theme.blue};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
const MenuCardContainer = styled(Container)`
  background: ${({ theme }) => theme.dark};
  padding: 20px;
  border-radius: 16px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & > div:first-child {
    width: 72%;
  }
  & > div:nth-child(2) {
    width: 26%;
  }
`;
const CardBikes = styled(Bikes)`
  display: flex;
  flex-direction: column;
  button {
    margin: 2px 0;
    border: 1px solid ${({ theme }) => theme.blue};
  }
`;
const NavigateBtn = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.dark};
  cursor: pointer;
  &:hover,
  &:active {
    background: ${({ theme }) => theme.primary_gradient};
  }
`;
const Return = styled.div`
  display: inline-block;
  margin: 8px 0px 16px 8px;
  color: ${({ theme }) => theme.grey};
  cursor: pointer;
  transition: all 0.3s;
  & path {
    fill: ${({ theme }) => theme.grey};
  }

  &:hover {
    color: ${({ theme }) => theme.light};
    & path {
      fill: ${({ theme }) => theme.light};
    }
  }
  span {
    margin-left: 12px;
    font-size: ${FONT_SIZE.md};
  }
`;

export function MenuCard() {
  const { setIsCardOpen } = useContext(NavContext);
  const { stations, setStations } = useContext(ApiContext);
  const [stationData, setStationData] = useState();

  const handleReturn = () => {
    setIsCardOpen(false);
    setStations(
      stations.map((station) => {
        return {
          ...station,
          isViewing: false
        };
      })
    );
  };

  useEffect(() => {
    setStationData(() => stations?.filter((station) => station.isViewing)[0]);
  }, [stations]);

  return (
    <MenuContainer>
      <Return onClick={handleReturn}>
        <ICONS.GoBack />
        <span>返回</span>
      </Return>
      {stationData && (
        <MenuCardContainer>
          <Top>
            <div>
              <Title>{stationData.StationName.Zh_tw}</Title>
              <Info>
                <div>
                  <Status>
                    ● {convertServiceStatus(stationData.status.ServiceStatus)}
                  </Status>
                  <span>
                    {convertServiceType(setStationData.ServiceType)} | 總數：
                    {stationData.BikesCapacity}
                  </span>
                </div>
                <div>{stationData.StationAddress.Zh_tw}</div>
              </Info>
            </div>
            <CardBikes>
              <button>
                <span>{stationData.status.AvailableRentBikes}</span> 可租
              </button>
              <button>
                <span>{stationData.status.AvailableReturnBikes}</span> 可還
              </button>
            </CardBikes>
          </Top>
          <NavigateBtn onClick={() => handleNavigate(stationData)}>
            前往導航
          </NavigateBtn>
        </MenuCardContainer>
      )}
    </MenuContainer>
  );
}
