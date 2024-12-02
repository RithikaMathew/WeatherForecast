import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h2>About this webpage</h2>
      <p>This is a current weather forecast, using the WeatherBit API. The slider filters cloudiness based on the following range from 800-804:</p>
      <ul>
        <li>800: Clear sky</li>
        <li>801: Few clouds</li>
        <li>802: Scattered clouds</li>
        <li>803: Broken clouds</li>
        <li>804: Overcast clouds</li>
      </ul>
    </div>
  );
};

export default About;