import styled from 'styled-components'
import { BTNS } from '../assets/Icons'
import { FONT_SIZE } from '../constants/styles'

const Refresh = styled.div`
  z-index: 1;
  position: absolute;
  top: 40px;
  right: 4px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  background: ${({ theme }) => theme.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 24px;
  }

  &:active {
    background: ${({ theme }) => theme.blue_hover};
  }
`
const Setting = styled(Refresh)`
  top: unset;
  bottom: 228px;
`
const Position = styled(Refresh)`
  top: unset;
  bottom: 170px;
  svg {
    width: 24px;
    height: 24px;
  }
`

export function RefreshBTN({ onClick }) {
  return (
    <Refresh onClick={onClick}>
      <BTNS.Update />
    </Refresh>
  )
}
export function SettingBTN() {
  return (
    <Setting>
      <BTNS.Setting />
    </Setting>
  )
}
export function PositionBTN({ onClick }) {
  return (
    <Position onClick={onClick}>
      <BTNS.Position />
    </Position>
  )
}

const TagContainer = styled.div`
  padding: 0 12px;
  margin: 0 4px;
  font-size: ${FONT_SIZE.xs};
  line-height: 1.5rem;
  background: ${({ theme }) => theme.blue};
  border: 1px solid ${({ theme }) => theme.blue600};
  border-radius: 20px;
  color: ${({ theme }) => theme.blue600};
`

export function Tag({ children }) {
  return <TagContainer>{children}</TagContainer>
}
