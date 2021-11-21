import styled from 'styled-components'
import { FONT_SIZE } from '../../constants/styles'
// import Card from '../Card'
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

export default function Routes() {
  return (
    <Page>
      <PageTitle>路線總覽</PageTitle>
      <Navbar />
    </Page>
  )
}
