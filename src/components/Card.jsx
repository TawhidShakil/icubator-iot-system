// src/components/MetricCard.jsx
import React from 'react';

const MetricCard = ({ title, value, unit, target, colorClass, valueClass }) => {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colorClass}`}>
            <h3 className="text-lg font-semibold text-gray-500 mb-2">{title}</h3>
            {/* Tailwind utility classes for dynamic color based on valueClass prop */}
            <p className={`text-5xl font-extrabold mb-1 ${valueClass}`}>
                {value}<small className="text-3xl font-normal ml-1">{unit}</small>
            </p>
            <p className="text-sm text-gray-500">Target: {target}</p>
        </div>
    );
};

export default MetricCard;