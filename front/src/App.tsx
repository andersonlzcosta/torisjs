import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Routes from './routes';
import { AbrigoHookProvider } from './hooks/AbrigoHook';

function App() {
  return (
    <Router>
      <AbrigoHookProvider>
        <Routes />
      </AbrigoHookProvider>
      <GlobalStyle />
    </Router>
  );
}

export default App;
