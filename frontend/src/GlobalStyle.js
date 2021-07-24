import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    width: 100%;
  }
  h1 {
    font-size: 2rem;
    font-family: 'Monterrat', sans-serif;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem
  }
  p {
    font-size: 0.9rem; 
    line-height: 200%;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  img {
    display: block; 
  }
`;

export default GlobalStyle;
