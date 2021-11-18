import styled from 'styled-components'
import { BTNS } from '../assets/Icons'
import { FONT_SIZE } from '../constants/styles'

const Refresh = styled.div`
  z-index: 1;
  position: absolute;
  top: 40px;
  right: 4px;
`
const Setting = styled(Refresh)`
  top: unset;
  right: 0;
  bottom: 190px;
`
const Position = styled(Refresh)`
  top: unset;
  bottom: 150px;
`

const iconStyles = {
  width: '50px',
  height: '50px'
}

export function RefreshBTN() {
  return (
    <Refresh>
      <BTNS.RefreshBtn style={iconStyles} />
    </Refresh>
  )
}
export function SettingBTN() {
  return (
    <Setting>
      <BTNS.SettingBtn style={{ width: '60px', height: '60px' }} />
    </Setting>
  )
}
export function PositionBTN() {
  return (
    <Position>
      <BTNS.PositionBtn style={iconStyles} />
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
