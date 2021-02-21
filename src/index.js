import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import DadChat from './DadChat';

// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#1D3557',
  headerFontColor: '#fff',
  headerFontSize: '24px',
  botBubbleColor: '#457B9D',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const App = () => (
  <div style={styles}>
    <ThemeProvider theme={theme}>
      <DadChat name={"Hiking With Dad"}/>
    </ThemeProvider>
  </div>
);

render(<App />, document.getElementById('root'));