import { createGlobalStyle } from 'styled-components'
import { colors } from './constants/colors'

const GlobalStyle = createGlobalStyle`


  body {
    margin: 0;
    padding: 0;

    background-color: ${colors.DARK_LIGHT_400};
    color: ${colors.GRAY_100};
    
  }
  
  * {
    font-family:  'Inter', sans-serif;
  }

  .home {
    display: flex;
    justify-content: center;
  }
  
`

export default GlobalStyle
