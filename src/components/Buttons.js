import styled from 'styled-components'
import { BTNS } from '../assets/Icons'

const Refresh = styled.div`
  position: absolute;
  top: 40px;
  right: 4px;
`
const Setting = styled(Refresh)`
  top: unset;
  right: 0;
  bottom: 160px;
`
const Position = styled(Refresh)`
  top: unset;
  bottom: 120px;
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
