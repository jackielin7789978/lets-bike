import { useContext } from 'react';
import { ApiContext } from '../../contexts';
import styled from 'styled-components';
import { FONT_SIZE } from '../../constants/styles';
import Card from '../Card';
import Navbar from '../Navbar';
import Loading from '../Loading';

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

export default function Stations() {
  const { stations, isLoading } = useContext(ApiContext);
  return (
    <Page>
      <PageTitle>單車站總覽</PageTitle>
      {isLoading ? (
        <Loading />
      ) : stations ? (
        stations.map((station) => (
          <Card key={station.StationUID} station={station} />
        ))
      ) : (
        <p>您附近沒有車站喔！</p>
      )}

      <Navbar />
    </Page>
  );
}
