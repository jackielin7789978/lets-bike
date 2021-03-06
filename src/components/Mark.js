import { useContext } from 'react';
import { NavContext, ApiContext } from '../contexts';
import styled from 'styled-components';
import { ICONS } from '../assets/Icons';
import { FONT_SIZE } from '../constants/styles';

const MarkContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  font-size: ${({ $isOpen }) => ($isOpen ? FONT_SIZE.sm : FONT_SIZE.xs)};
  cursor: pointer;
  z-index: ${({ $isOpen }) => ($isOpen ? 2 : 0)};
  span {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  svg {
    transition: all 0.2s;
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
`;

export default function Mark({ station, id }) {
  const { setIsCardOpen } = useContext(NavContext);
  const { stations, setStations } = useContext(ApiContext);

  const handleClickEvent = (id) => {
    if (station.isViewing) {
      setIsCardOpen(false);
      setStations(
        stations.map((station) => {
          return {
            ...station,
            isViewing: false
          };
        })
      );
    } else {
      setIsCardOpen(true);
      setStations(
        stations.map((station) => {
          if (id !== station.StationUID)
            return { ...station, isViewing: false };
          return {
            ...station,
            isViewing: true
          };
        })
      );
    }
  };

  return (
    <>
      <MarkContainer
        onClick={() => handleClickEvent(id)}
        $isOpen={station.isViewing}
      >
        <span>{station.status?.AvailableRentBikes}</span>
        <ICONS.Ubike />
      </MarkContainer>
    </>
  );
}
