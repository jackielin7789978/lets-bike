import { createGlobalStyle } from 'styled-components'
import { FONT } from './styles'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: ${FONT.zh};
  }
  p {
    line-height: 2rem;
  }
  button {
    border: none;
  }
  a {
    text-decoration: none;
  }
`

export default GlobalStyle
