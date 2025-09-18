import React from 'react';

const ForecastCard = ({ day }) => (
    <div className="card">
        <p className="day">
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </p>
        <img src={day.day.condition.icon} alt={day.day.condition.text} />
        <p>{day.day.maxtemp_c}° / {day.day.mintemp_c}°</p>
    </div>
);

export default ForecastCard;
