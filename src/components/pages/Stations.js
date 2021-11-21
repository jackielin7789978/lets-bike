import { useContext } from 'react';
import { ApiContext } from '../../contexts';
import styled from 'styled-components';
import { FONT_SIZE } from '../../constants/styles';
import Card from '../Card';
import Navbar from '../Navbar';

const Page = styled.div`
  background: ${({ theme }) => theme.dark};
  padding: 20px 20px 170px 20px;
  min-height: 100vh;
  position: relative;
`;
const PageTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  color: ${({ theme }) => theme.grey};
`;

const NoStation = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.grey};
  font-size: ${FONT_SIZE.xl};
`;

export default function Stations() {
  const { stations } = useContext(ApiContext);

  return (
    <Page>
      <PageTitle>單車站總覽</PageTitle>
      <NoStation>這附近沒有車站喔！</NoStation>
      {stations.map((station) => (
        <Card key={station.StationUID} station={station} />
      ))}
      <Navbar />
    </Page>
  );
}
