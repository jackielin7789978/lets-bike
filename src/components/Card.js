import { useState, useContext } from 'react'
import { NavContext, ApiContext } from '../contexts'
import styled from 'styled-components'
import { FONT_SIZE } from '../constants/styles'
import { ICONS } from '../assets/Icons'
import { useEffect } from 'react/cjs/react.development'

const Container = styled.div`
  width: 100%;
  line-height: 2rem;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.blue};
  position: relative;
`
const Title = styled.div`
  color: ${({ theme }) => theme.light};
`
const Info = styled.div`
  color: ${({ theme }) => theme.grey500};
  font-size: ${FONT_SIZE.xs};
`
const Status = styled.span`
  color: ${({ theme }) => theme.success};
  margin-right: 12px;
`
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
`
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
  svg {
    width: 20px;
    height: 20px;
  }
`

export default function Card() {
  return (
    <Container>
      <Title>捷運市政府站 (3 號出口)</Title>
      <Info>
        <div>
          <Status>● 正常營運</Status>
          <span>YouBike 1.0 | 總數：30</span>
        </div>
        <div>地址：忠孝東路/松仁路(東南側)</div>
      </Info>
      <Bikes>
        <button>
          <span>20</span> 可租
        </button>
        <button>
          <span>10</span> 可還
        </button>
      </Bikes>
      <LocationICON>
        <ICONS.Address />
      </LocationICON>
    </Container>
  )
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
`
const MenuCardContainer = styled(Container)`
  background: ${({ theme }) => theme.dark};
  padding: 20px;
  border-radius: 16px;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const CardBikes = styled(Bikes)`
  display: flex;
  flex-direction: column;
  button {
    margin: 2px 0;
    border: 1px solid ${({ theme }) => theme.blue};
  }
`
const NavigateBtn = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.dark};

  &:hover,
  &:active {
    background: ${({ theme }) => theme.primary_gradient};
  }
`
const Return = styled.div`
  margin: 8px 0px 16px 8px;
  color: ${({ theme }) => theme.grey};
  & path {
    fill: ${({ theme }) => theme.grey};
  }
  span {
    margin-left: 12px;
    font-size: ${FONT_SIZE.md};
  }
`

export function MenuCard() {
  const { setIsCardOpen } = useContext(NavContext)
  const { stations } = useContext(ApiContext)
  const [stationData, setStationData] = useState()

  useEffect(() => {
    setStationData(() => stations?.filter((station) => station.isViewing)[0])
  }, [stations])

  useEffect(() => {
    console.log(stationData)
  }, [stationData])

  return (
    <MenuContainer>
      <Return onClick={() => setIsCardOpen(false)}>
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
                  <Status>● {stationData.ServiceType}</Status>
                  <span>總數：{stationData.BikesCapacity}</span>
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
          <NavigateBtn>前往導航</NavigateBtn>
        </MenuCardContainer>
      )}
    </MenuContainer>
  )
}
