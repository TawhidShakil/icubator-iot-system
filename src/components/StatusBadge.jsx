// src/components/StatusCard.jsx
import React from 'react';

const getIndicatorColor = (label, status) => {
    if (status === 'ON') {
        return label.includes('HEAT') ? 'text-red-500' : 'text-blue-500';
    } else if (status === 'STOPPED' || status === 'IDLE') {
        return 'text-yellow-500'; 
    } else {
        return 'text-gray-500'; 
    }
};

const StatusCard = ({ alerts, indicators }) => {
    const alertColor = alerts === 'SYSTEM OK' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">ALARM & STATUS</h3>
            
            <div className={`text-2xl font-bold p-3 rounded-md mb-3 ${alertColor}`}>
                {alerts}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                {indicators.map((indicator, index) => (
                    <span 
                        key={index} 
                        className={`${getIndicatorColor(indicator.label, indicator.status)} ${indicator.colSpan ? 'col-span-2' : ''}`}
                    >
                        {indicator.label}: {indicator.status} 
                    </span>
                ))}
            </div>
        </div>
    );
};

export default StatusCard;