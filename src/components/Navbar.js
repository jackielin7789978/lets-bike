import { useState } from 'react'
import styled from 'styled-components'
import { LOGOS, ICONS } from '../assets/Icons'
import { FONT_SIZE } from '../constants/styles'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: ${({ theme }) => theme.blue};
  display: flex;
  align-items: center;
  border-top: 1px solid #31506c80;
`
const LogoStyles = {
  width: '38px',
  height: '24px'
}

const LogoContainer = styled.div`
  width: 20%;
  height: 86%;
  margin: 0 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Buttons = styled(LogoContainer)`
  border-radius: 10px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.dark : theme.blue};
  flex: 1;
  & path {
    fill: ${({ theme }) => theme.light};
  }
`
const Menu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 48px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.blue};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  p {
    color: ${({ theme }) => theme.light};
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const Input = styled.input`
  height: 48px;
  width: 18%;
  width: 84%;
  border: 1px solid ${({ theme }) => theme.dark};
  border-radius: 10px;
  background: rgba(17, 28, 38, 0.5);
  padding: 10px 16px;
  font-size: ${FONT_SIZE.md};
  color: ${({ theme }) => theme.light};

  &:focus {
    background: ${({ theme }) => theme.dark};
    border: 1px solid #31506c;
  }
`
const SearchBtn = styled.button`
  height: 46px;
  width: 46px;
  border-radius: 10px;
  background: ${({ theme }) => theme.secondary};
  & path {
    fill: ${({ theme }) => theme.dark};
  }
  &:active {
    background: ${({ theme }) => theme.secondary_active};
    border: 2px solid background: ${({ theme }) => theme.secondary};
  }
`

export default function Navbar() {
  const [menu, setMenu] = useState('map')

  return (
    <>
      <Menu>
        <p>
          下班來兜風，找單車站...
          <ICONS.Bike
            style={{ width: '24px', height: '24px', marginLeft: '12px' }}
          />
        </p>
        <div>
          <Input placeholder='輸入想去的地點尋找附近車站' />
          <SearchBtn>
            <ICONS.Search />
          </SearchBtn>
        </div>
      </Menu>
      <Container>
        <LogoContainer>
          <LOGOS.LogoBike style={LogoStyles} />
        </LogoContainer>
        <Buttons
          id='map'
          onClick={(e) => {
            setMenu(e.target.id)
          }}
          $isActive={false}
        >
          <ICONS.Map style={LogoStyles} />
        </Buttons>
        <Buttons
          id='station'
          onClick={(e) => {
            setMenu(e.target.id)
          }}
          $isActive={false}
        >
          <ICONS.Bike style={LogoStyles} />
        </Buttons>
        <Buttons
          id='routes'
          onClick={(e) => {
            setMenu(e.target.id)
          }}
          $isActive={true}
        >
          <ICONS.Route style={LogoStyles} />
        </Buttons>
      </Container>
    </>
  )
}
