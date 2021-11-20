import { useState, useContext } from 'react'
import { NavContext } from '../contexts'
import styled from 'styled-components'
import { ICONS } from '../assets/Icons'
import { FONT_SIZE } from '../constants/styles'

const MarkContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  font-size: ${({ $isOpen }) => ($isOpen ? FONT_SIZE.sm : FONT_SIZE.xs)};
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

export default function Mark({ station }) {
  const { isCardOpen, setIsCardOpen } = useContext(NavContext)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <MarkContainer
        key={station.StationID}
        lat={station.StationPosition.PositionLat}
        lng={station.StationPosition.PositionLon}
        data={station}
        onClick={() => {
          setIsOpen(!isOpen)
          setIsCardOpen(!isCardOpen)
        }}
        $isOpen={isOpen}
      >
        <span>{station.status?.AvailableRentBikes}</span>
        <ICONS.Ubike />
      </MarkContainer>
    </>
  )
}
