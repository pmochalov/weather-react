import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainDate from './components/MainDate/MainDate';
import Intro from './components/Intro/Intro';
import Tabs from './components/Tabs/Tabs';

function App() {

  const [mode, setMode] = React.useState('short') // short - краткий, detailed - подробный
  const [main, setMain] = React.useState({});
  const [weather, setWeather] = React.useState([]);
  const [wind, setWind] = React.useState({});
  const [sys, setSys] = React.useState({});
  const [dt, setDt] = React.useState(null);

  const handleSetMode = (event) => {
    const target = event.target;
    setMode(target.dataset.mode)
  }

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(getIntroURL());
      const data = await response.json();
      setMain(data.main);
      setWeather(data.weather[0]);
      setWind(data.wind);
      setSys(data.sys);
      setDt(data.dt);
      console.log(data)
    };
    getData();
  }, []);


  return (
    <>
      <Header />

      <MainDate dt={dt} />

      <Intro main={main} weather={weather} wind={wind} sys={sys} />

      <Tabs mode={mode} handleSetMode={handleSetMode} />

      <Footer />
    </>
  );
}

const getIntroURL = () => {
  return `${process.env.REACT_APP_API_URL}?intro`;
}

const getShortURL = () => {
  return `${process.env.REACT_APP_API_URL}?short`;
}

const getDetailedURL = () => {
  return `${process.env.REACT_APP_API_URL}?detailed`;
}

export default App;
