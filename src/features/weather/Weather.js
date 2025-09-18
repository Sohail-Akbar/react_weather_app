import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, setCity } from './weatherSlice';
import ForecastCard from '../../components/ForecastCard';

const Weather = () => {
    const dispatch = useDispatch();
    const { city, data, loading, error } = useSelector((state) => state.weather);

    useEffect(() => {
        dispatch(fetchWeather(city));
    }, [dispatch]);

    const handleSearch = () => {
        if (city.trim()) dispatch(fetchWeather(city));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className={`container ${data?.current?.condition?.text?.toLowerCase().replace(/\s/g, '-') || ''}`}>
            <div className="search">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => dispatch(setCity(e.target.value))}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter city"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading weather...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && data && (
                <>
                    <div className="current">
                        <h2>{data.location.name}, {data.location.country}</h2>
                        <div className="temp">{data.current.temp_c}°C</div>
                        <div className="condition">
                            <img src={data.current.condition.icon} alt={data.current.condition.text} />
                            <span>{data.current.condition.text}</span>
                        </div>
                        <div className="info">
                            <p>Precipitation: {data.current.precip_mm}mm</p>
                            <p>Humidity: {data.current.humidity}%</p>
                            <p>Wind: {data.current.wind_kph} km/h</p>
                        </div>
                    </div>

                    <div className="forecast">
                        {data.forecast.forecastday.map((day, i) => (
                            <ForecastCard key={i} day={day} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
