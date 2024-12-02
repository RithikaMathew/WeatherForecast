import { useState, useEffect } from "react";
import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import Card from "./components/Card";
import { TempChart, UVChart } from './components/Chart';
import WeatherInfo from "./components/WeatherInfo";


function App() {
  const [list, setList] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchAllCatData = async () => {

      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Parkland%2C%20FL&days=16&units=I&key=${API_KEY}`);
      console.log(response);
      const json = await response.json();
      setList(json);

    };
    fetchAllCatData().catch(console.error);;
  }, []);

  const modeOrigin = () => {

    let arr = list.data;
    if (!arr || arr.length === 0) {
      console.log("Array is empty");
      return;
    }

    let freqCounter = {};
    arr.forEach((element) => {
      if (!element.weather.description) {
        console.log("Weather description is not defined for an element");
        return;
      }
      freqCounter[element.weather.description] = (freqCounter[element.weather.description] || 0) + 1;
    });

    let mode;
    let maxFreq = 0;
    for (const x in freqCounter) {
      if (freqCounter[x] > maxFreq) {
        mode = x;
        maxFreq = freqCounter[x];
      }
    }
    let matchingElement = arr.find(element => element.weather.description === mode);
    getIcon(matchingElement)

    return mode;
  };

  const getIcon = (matchingElement) => {
    if (matchingElement && matchingElement.weather.icon !== icon) {
      setIcon(matchingElement.weather.icon);
    }
  };

  const avg = () => {

    let arr = list.data;
    let total = 0;
    arr.forEach((element) => {
      total += element.temp;
    });
    const avg = total / arr.length;
    return avg;
  };

  const median = () => {

    let arr = list.data;
    let length = arr.length;
    arr.sort((a, b) => a.clouds - b.clouds);
    let mid = Math.floor(length / 2);
    if (length % 2 == 0) {
      return (arr[mid + 1].clouds + arr[mid].clouds) / 2;
    }
    return arr[mid].clouds;

  };


  return (
    <div className="master">
      <div className="hero">
        <div className="cards">
          <div className="card-container">
            <Card desc={list && modeOrigin()}
              category="Most Frequent Weather Description in Parkland, FL" />
            <img src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
              className='weather-icon'
              alt="weather icon" />
          </div>
          <Card
            desc={list && `${avg().toFixed(2)}°C`}
            category="Avg Temp in °F in Parkland, FL" />
          <Card
            desc={list && `${median()}%`}
            category="Median Cloud coverage in Parkland, FL"
          />
        </div>
        <div className="data-div">
          <WeatherInfo />
          {list && list.data && <TempChart className="chart" temp={list.data} />}
          {list && list.data && <UVChart className="chart" uv={list.data} />}
        </div>
      </div>
    </div>
  );
}

export default App;