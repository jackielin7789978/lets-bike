import styled from 'styled-components'
import { FONT_SIZE } from '../constants/styles'
import { ICONS } from '../assets/Icons'

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
