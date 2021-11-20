import styled from 'styled-components'
import { FONT_SIZE } from '../../constants/styles'
import Card from '../Card'
import Navbar from '../Navbar'

const Page = styled.div`
  background: ${({ theme }) => theme.dark};
  padding: 20px;
  min-height: 100vh;
  position: relative;
`
const PageTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  color: ${({ theme }) => theme.grey};
`

export default function Stations() {
  return (
    <Page>
      <PageTitle>單車站總覽</PageTitle>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Navbar />
    </Page>
  )
}
