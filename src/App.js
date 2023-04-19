import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainDate from './components/MainDate/MainDate';
import Intro from './components/Intro/Intro';
import Tabs from './components/Tabs/Tabs';

export const WeatherContext = React.createContext();
export const TabsContext = React.createContext();

function App() {

  const [isLoading, setIsLoading] = React.useState(true);

  const [mode, setMode] = React.useState('short') // short - краткий, detailed - подробный
  const [main, setMain] = React.useState({});
  const [weather, setWeather] = React.useState([]);
  const [wind, setWind] = React.useState({});
  const [sys, setSys] = React.useState({});
  const [dt, setDt] = React.useState(null);

  const [shortData, setShortData] = React.useState([]);
  const [detailedData, setDetailedData] = React.useState([]);

  const handleSetMode = (event) => {
    const mode = event.target.dataset.mode;
    setMode(mode);

    if(mode === 'short') {
      getShortData();
    }

    if(mode === 'detailed') {
      // getDetailedData();
    }    
  }

  const getIntroData = async () => {
    const response = await fetch(getIntroURL());
    const data = await response.json();

    setMain(data.main);
    setWeather(data.weather[0]);
    setWind(data.wind);
    setSys(data.sys);
    setDt(data.dt);

    console.log('IntroData: ', data)
  }

  const getShortData = async () => {
    const response = await fetch(getShortURL());
    const data = await response.json();
    setShortData(data.list)
    console.log('ShortData: ', data.list)
  }  

  const getDetailedData = async () => {
    const response = await fetch(getDetailedURL());
    const data = await response.json();
    setDetailedData(data.list)
    console.log('DetailedData: ', data.list)
  }    

  React.useEffect(() => {
    getIntroData();
    getShortData();
    // getDetailedData();

    setIsLoading(false);
  }, []);


  return (isLoading ||
    <WeatherContext.Provider value={{main, weather, wind, sys, dt}}>
      <Header />

      <MainDate />

      <Intro />
      <TabsContext.Provider value={{mode, handleSetMode, shortData, detailedData}}>
        <Tabs />
      </TabsContext.Provider>

      <Footer />
    </WeatherContext.Provider>
  );
}


const getIntroURL = () => {
  return `${process.env.REACT_APP_API_URL}?intro`;
}

const getShortURL = () => {
  return `${process.env.REACT_APP_API_URL}?daily`;
}

const getDetailedURL = () => {
  return `${process.env.REACT_APP_API_URL}?detailed`;
}

export default App;
