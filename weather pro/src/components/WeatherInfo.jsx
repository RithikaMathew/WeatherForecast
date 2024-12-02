import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './Sidebar';

const WeatherInfo = () => {
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [sliderVal, setSliderVal] = useState(0);
  const [textVal, setTextVal] = useState("");
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const navigate = useNavigate();


  const fetchAllCityData = async (cities = []) => {
    const responses = await Promise.all(
      cities.map(city =>
        fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&units=I&key=${API_KEY}`).then(response =>
          response.json()
        )
      )
    );
    const allData = responses.flatMap(response => response.data);
    setData(allData);
    setFilteredList(allData);
    console.log(data); 
  };

  useEffect(() => {
    fetchAllCityData(['New York,US', 'London,UK', 'Paris,FR', 'Miami,FL', 'Tokyo, JP', 'Hong Kong, CN']).catch(console.error);
  }, []);

  const handleResetSlider = () => {
    setSliderVal(0);
  }

  const searchItems = (e) => {
    const inputValue = String(e.target.value);
    setTextVal(inputValue);
  };

  const handleInputChangeRange = (e) => {
    const inputValue = Number(e.target.value);
    setSliderVal(inputValue);
  };

  const handleSubmit = () => {
    let ansList = [...data];
    if (textVal !== "") {
      ansList = ansList.filter(
        (element) => {
          return element.city_name.toLowerCase().includes(textVal.toLowerCase());
        }
      );
    }
    if (sliderVal !== 0) {
      ansList = ansList.filter(
        (element) => Number(element.weather.code) === sliderVal
      );
    }

    if (ansList.length === 0) {
      setFilteredList(["no data"]);
      navigate('/notfound'); // Navigate to the NotFound page
    } else {
      setFilteredList(ansList);
    }
  };


  return (
    <div className="info">
      <SideBar onDashboardClick={() => { handleResetSlider(); setFilteredList(list ? list.data : []); setTextVal(''); handleSubmit(); }} />      <div className="search-tools">
        <input
          type="text"
          placeholder="Enter city..."
          value={textVal}
          className="search-tool"
          onChange={searchItems}
        />
        <input
          type="range"
          min="800"
          max="804"
          value={sliderVal}
          className="search-tool"
          onChange={handleInputChangeRange}
        />
        <button id="reset" onClick={handleResetSlider}>
          <p>Reset Slider</p>
        </button>
        <button id="submit" onClick={handleSubmit}>
          <p>SEARCH</p>
        </button>
      </div>
      <table className="info-container">
        <thead>
          <tr>
            <th>City</th>
            <th>Max Temp</th>
            <th>UV</th>
            <th>Weather Description</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item, index) => (
            <tr key={index}>
              <td>{item.city_name}</td>
              <td>{item.app_temp} °F</td>
              <td>{item.uv.toFixed(2)}</td>
              <td>
                {item.weather.description}
                <img src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`} />
              </td>
              <td>
                <Link
                  to={`/weatherDetails/${item.city_name}`}
                  key={item.city_name}
                >
                  🔗
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherInfo;