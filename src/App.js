import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainDate from './components/MainDate/MainDate';
import Intro from './components/Intro/Intro';
import Tabs from './components/Tabs/Tabs';

function App() {
  
  const [mode, setMode] = React.useState('short') // short, detailed

  const handleSetMode = (event) => {
      const target = event.target.dataset;
      setMode(target.mode)
  }

  return (
    <>
      <Header />

      <MainDate />

      <Intro />

      <Tabs mode={mode} handleSetMode={handleSetMode}/>

      <Footer />
    </>
  );
}

export default App;
