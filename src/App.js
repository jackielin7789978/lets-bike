import SimpleMap from './Map'
import GlobalStyle from './constants/globalStyle'
import { THEME } from './constants/styles'
import { ThemeProvider } from 'styled-components'

export default function App() {
  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <SimpleMap />
    </ThemeProvider>
  )
}
