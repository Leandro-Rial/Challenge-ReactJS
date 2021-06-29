import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Pages from './components/Pages/Pages';

import './scss/styled.scss';

function App() {
  return (
    <Router>
      <Header />
      <Pages />
    </Router>
  );
}

export default App;
