// src/pages/Dashboard.jsx
import React from 'react';
import Header from '../components/Header'
import MetricCard from '../components/Card';
import StatusCard from '../components/StatusBadge';
import ProgressSection from '../components/ProgressSection';


const DUMMY_DATA = {
    temp: { current: 37.5, target: 37.7, unit: '°C' },
    humidity: { current: 55, target: 65, unit: '%', color: 'border-blue-500' },
    ventilation: '01:30:10',
    turnInterval: '6 Hours',
    progress: { day: 10, total: 21, hatchDate: '15/05/2026' },
    alerts: 'SYSTEM OK',
    indicators: [
        { label: 'HEAT 1', status: 'ON' },
        { label: 'FAN', status: 'ON' },
        { label: 'HEAT 2', status: 'OFF' },
        { label: 'WET', status: 'IDLE' },
        { label: 'WINGS', status: 'STOPPED', colSpan: true },
    ]
};

const Dashboard = () => {
    const statusData = DUMMY_DATA; 

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="p-8 max-w-7xl mx-auto">
                
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-[#1c3456] mb-2">Smart Egg Incubator Monitoring System</h1>
                    <p className="text-gray-600 mb-4">Monitor temperature, humidity, and incubation progress in real time with accuracy and ease.</p>
                    <p className="text-sm text-gray-500 max-w-3xl mx-auto">
                        Receive instant alerts, track every stage of development, and ensure the best hatch results 
                        with a reliable and smart monitoring system designed for modern hatcheries.
                    </p>
                    <button className="mt-6 bg-[#1c3456] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2a4d7d] transition duration-200">
                        Expore More
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                    Real-Time Monitoring
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <MetricCard 
                        title="HEATING CONTROL" 
                        value={statusData.temp.current} 
                        unit={statusData.temp.unit} 
                        target={statusData.temp.target + statusData.temp.unit} 
                        colorClass="border-red-500" 
                        valueClass="text-red-600"
                    />

                    <MetricCard 
                        title="HUMIDITY CONTROL" 
                        value={statusData.humidity.current} 
                        unit={statusData.humidity.unit} 
                        target={statusData.humidity.target + statusData.humidity.unit} 
                        colorClass="border-blue-500" 
                        valueClass="text-blue-600"
                    />

                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-gray-500 mb-2">VENTILATION CONTROL</h3>
                        <p className="text-4xl font-extrabold text-green-600 mb-2">{statusData.ventilation}</p>
                        <h3 className="text-lg font-semibold text-gray-500 mb-2">TURN CYCLE</h3>
                        <p className="text-sm text-gray-500">Interval: {statusData.turnInterval}</p>
                    </div>

                    <StatusCard 
                        alerts={statusData.alerts} 
                        indicators={statusData.indicators} 
                    />
                </div>
                
                <ProgressSection 
                    currentDay={statusData.progress.day} 
                    totalDays={statusData.progress.total} 
                    hatchDate={statusData.progress.hatchDate} 
                />

            </main>

            <footer className="mt-10 p-4 text-center text-xs text-gray-500 border-t">
                @All Rights Reserved By NextGenious
            </footer>
        </div>
    );
};

export default Dashboard;