import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const TempChart = ({ className, temp }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (temp) {
      const chartData = temp.map(item => ({
        name: item.datetime,
        temp: item.temp,
      }));

      setData(chartData);
    }
  }, [temp]);

  const TempCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'black', padding: '10px' }}>
          <p >{`Date : ${label}`}</p>
          <p >{`Temp : ${payload[0].value} °F`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <h2 className="chart-title">Temperature Over Time in Parkland, FL</h2>
      {data ? (
        <LineChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Date" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Temperature (°F)" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip content={<TempCustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#00fbff" activeDot={{ r: 8 }} />
        </LineChart>
      ) : null}
    </div>
  );
};

const UVChart = ({ className, uv }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (uv) {
      // Transform the data into the format that the chart expects
      const chartData = uv.map(item => ({
        name: item.datetime,
        uv: item.uv,
      }));

      setData(chartData);
    }
  }, [uv]);

  const UVCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'black', padding: '10px' }}>
          <p className="label">{`Date : ${label}`}</p>
          <p className="intro">{`UV Index : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={className}>
      <h2 className="chart-title">UV Index Over Time in Parkland, FL</h2>
      {data ? (
        <BarChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Date" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="UV Index" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip content={<UVCustomTooltip />} />

          <Legend />
          <Bar dataKey="uv" fill="#fecb00f4" />
        </BarChart>
      ) : null}
    </div>
  );
};

export { TempChart, UVChart };