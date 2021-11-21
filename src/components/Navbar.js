import { useContext } from 'react';
import { NavContext } from '../contexts';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LOGOS, ICONS } from '../assets/Icons';
import { FONT_SIZE } from '../constants/styles';
import { Tag } from './Buttons';
import { MenuCard } from './Card';

const Container = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: ${({ theme }) => theme.blue};
  display: flex;
  align-items: center;
  border-top: 1px solid #31506c80;
`;
const LogoStyles = {
  width: '38px',
  height: '24px'
};

const LogoContainer = styled.div`
  width: 20%;
  height: 86%;
  margin: 0 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Buttons = styled(NavLink)`
  width: 20%;
  height: 86%;
  margin: 0 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.dark : theme.blue};
  flex: 1;
  & path {
    fill: ${({ theme }) => theme.light};
  }
`;
const Menu = styled.div`
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 48px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.blue};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > div:first-child {
    margin: 4px 0;
    padding: 0 2px;
  }
  p {
    color: ${({ theme }) => theme.light};
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
`;
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
`;
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
`;

function RenderMenu({ isCard, title }) {
  const handleTitle = (title) => {
    switch (title) {
      case '/stations':
        return '單車站搜尋';
      case '/routes':
        return '路線搜尋';
      default:
        return '找單車站...';
    }
  };
  return isCard ? (
    <MenuCard />
  ) : (
    <Menu>
      <div>
        <p>
          {handleTitle(title)}
          {title === 'map' && (
            <ICONS.Bike
              style={{ width: '24px', height: '24px', marginLeft: '12px' }}
            />
          )}
        </p>
        {title !== 'map' && (
          <div>
            <Tag>依車站名稱</Tag>
            <Tag>依地址</Tag>
          </div>
        )}
      </div>
      <div>
        <Input placeholder='輸入想去的地點尋找附近車站' />
        <SearchBtn>
          <ICONS.Search />
        </SearchBtn>
      </div>
    </Menu>
  );
}

export default function Navbar() {
  const { isCardOpen } = useContext(NavContext);
  const location = useLocation();

  return (
    <>
      <RenderMenu isCard={isCardOpen} title={location.pathname} />
      <Container>
        <LogoContainer>
          <LOGOS.LogoBike style={LogoStyles} />
        </LogoContainer>
        <Buttons to='/map' $isActive={location.pathname === '/map'}>
          <ICONS.Map style={LogoStyles} />
        </Buttons>
        <Buttons to='/stations' $isActive={location.pathname === '/stations'}>
          <ICONS.Bike style={LogoStyles} />
        </Buttons>
        <Buttons to='/routes' $isActive={location.pathname === '/routes'}>
          <ICONS.Route style={LogoStyles} />
        </Buttons>
      </Container>
    </>
  );
}
