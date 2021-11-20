import { useContext } from 'react'
import { NavContext, ApiContext } from '../contexts'
import styled from 'styled-components'
import { ICONS } from '../assets/Icons'
import { FONT_SIZE } from '../constants/styles'

const MarkContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  font-size: ${({ $isOpen }) => ($isOpen ? FONT_SIZE.sm : FONT_SIZE.xs)};
  cursor: pointer;
  span {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  svg {
    width: ${({ $isOpen }) => ($isOpen ? '40px' : '30px')};
    height: ${({ $isOpen }) => ($isOpen ? '40px' : '30px')};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & path {
    fill: ${({ $isOpen, theme }) =>
      $isOpen ? theme.primary_clicked : theme.primary};
  }
`

export default function Mark({ station, id }) {
  const { setIsCardOpen } = useContext(NavContext)
  const { stations, setStations } = useContext(ApiContext)

  const handleClickEvent = (id) => {
    if (stations.filter((station) => station.StationUID === id)[0].isViewing) {
      setIsCardOpen(false)
      setStations(() => {
        stations.filter(
          (station) => station.StationUID === id
        )[0].isViewing = false
        return stations
      })
    } else {
      setIsCardOpen(true)
      setStations(() => {
        stations.filter(
          (station) => station.StationUID === id
        )[0].isViewing = true
        return stations
      })
    }
  }

  return (
    <>
      <MarkContainer onClick={() => handleClickEvent(id)}>
        <span>{station.status?.AvailableRentBikes}</span>
        <ICONS.Ubike />
      </MarkContainer>
    </>
  )
}
