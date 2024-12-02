import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function PlaceDetail() {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getWeatherDetail = async () => {
            setIsLoading(true);
            const details = await fetch(
                `https://api.weatherbit.io/v2.0/current?&city=${params.city}&units=I&key=${API_KEY}`
            );

            const detailsJson = await details.json();

            setFullDetails(detailsJson.data[0]);
            setIsLoading(false);
        };

        getWeatherDetail().catch(console.error);
    }, [params.city]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="detail-view">
            <h1>{fullDetails.city_name}</h1>

            <table>
                <tbody>
                    <tr>
                        <th>Max Temp</th>
                        <td>{fullDetails.app_temp} °F</td>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <td>{fullDetails.datetime}</td>
                    </tr>
                    <tr>
                        <th>UV Index</th>
                        <td>{fullDetails.uv.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Time Zone</th>
                        <td>{fullDetails.timezone}</td>
                    </tr>

                    <tr>
                        <th>Wind Speed</th>
                        <td>{fullDetails.wind_spd} mph</td>
                    </tr>
                    <tr>
                        <th>Weather Description</th>
                        <td>{fullDetails.weather.description}</td>
                    </tr>

                </tbody>
            </table>
            <img src={`https://www.weatherbit.io/static/img/icons/${fullDetails.weather.icon}.png`} />

        </div>
    );

}

export default PlaceDetail;