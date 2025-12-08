import React, { useState } from 'react';

// Modal Component for Changing Values
const ChangeValueModal = ({ isOpen, onClose, title, currentValue, targetValue, unit, onSave }) => {
    const [inputValue, setInputValue] = useState(targetValue);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(inputValue);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop - Blurred and Gray */}
            <div 
                className="absolute inset-0 bg-opacity-50 backdrop-blur-xs"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Change {title}</h2>
                    <p className="text-gray-500 text-sm">Set your desired target value</p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Value: {currentValue}{unit}
                    </label>
                    <label className="block text-sm font-semibold text-blue-700 mb-2">
                        Current Target: {targetValue}{unit}
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.1"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder={`Enter target value`}
                        />
                        <span className="absolute right-4 top-3 text-lg font-semibold text-gray-500">
                            {unit}
                        </span>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        <span className="font-semibold">New Target Value:</span> {inputValue}{unit}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 bg-[#1c3456] text-white rounded-lg font-semibold hover:bg-[#2a4d7d] transition duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

// MetricCard Component with Hover Effect
const MetricCard = ({ title, value, unit, target, colorClass, valueClass, onValueChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetValue, setTargetValue] = useState(parseFloat(target));

    const handleChangeValue = () => {
        setIsModalOpen(true);
    };

    const handleSaveValue = (newTargetValue) => {
        setTargetValue(newTargetValue);
        if (onValueChange) {
            onValueChange(newTargetValue);
        }
        console.log(`${title} target updated to: ${newTargetValue}${unit}`);
    };

    return (
        <>
            <div 
                className={`relative bg-white p-6 rounded-xl shadow-lg border-l-4 ${colorClass} h-full transition-all duration-200`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h3 className="text-lg font-semibold text-gray-500 mb-2">{title}</h3>
                <p className={`text-4xl font-extrabold ${valueClass} mb-2`}>
                    {value}
                    <span className="text-2xl ml-1">{unit}</span>
                </p>
                <p className="text-sm text-gray-500">Target: {targetValue}{unit}</p>
                
                {isHovered && (
                    <div className="absolute inset-0 bg-opacity-50 rounded-xl flex items-end justify-center p-12">
                        <button 
                            onClick={handleChangeValue}
                            className="bg-green-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-lg"
                        >
                            Change Value
                        </button>
                    </div>
                )}
            </div>

            <ChangeValueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                currentValue={value}
                targetValue={targetValue}
                unit={unit}
                onSave={handleSaveValue}
            />
        </>
    );
};

// StatusCard Component
const StatusCard = ({ alerts, indicators }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">SYSTEM STATUS</h3>
            <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {alerts}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {indicators.map((indicator, idx) => (
                    <div 
                        key={idx} 
                        className={`${indicator.colSpan ? 'col-span-2' : ''} bg-gray-50 p-2 rounded text-center`}
                    >
                        <p className="text-xs text-gray-500">{indicator.label}</p>
                        <p className={`text-sm font-bold ${indicator.status === 'ON' ? 'text-green-600' : 'text-gray-400'}`}>
                            {indicator.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ProgressSection Component
const ProgressSection = ({ currentDay, totalDays, hatchDate }) => {
    const progress = (currentDay / totalDays) * 100;
    
    return (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Incubation Progress</h2>
            <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-700">Day {currentDay} of {totalDays}</span>
                <span className="text-sm text-gray-500">Expected Hatch: {hatchDate}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-2">{Math.round(progress)}% Complete</p>
        </div>
    );
};

// Header Component
const Header = () => {
    return (
        <header className="bg-[#1c3456] text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Incubator Control</h1>
                <nav className="flex gap-4">
                    <button className="hover:text-gray-300 transition">Dashboard</button>
                    <button className="hover:text-gray-300 transition">Settings</button>
                </nav>
            </div>
        </header>
    );
};

// Main Dashboard Component
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

    const handleHeatingChange = (newValue) => {
        console.log('Heating control updated to:', newValue);
        // Add your API call or state update logic here
    };

    const handleHumidityChange = (newValue) => {
        console.log('Humidity control updated to:', newValue);
        // Add your API call or state update logic here
    };

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
                        Explore More
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                    Real-Time Monitoring
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className='h-full'>
                        <MetricCard 
                            title="HEATING CONTROL" 
                            value={statusData.temp.current} 
                            unit={statusData.temp.unit} 
                            target={statusData.temp.target + statusData.temp.unit} 
                            colorClass="border-red-500" 
                            valueClass="text-red-600"
                            onValueChange={handleHeatingChange}
                        />
                    </div>

                    <MetricCard 
                        title="HUMIDITY CONTROL" 
                        value={statusData.humidity.current} 
                        unit={statusData.humidity.unit} 
                        target={statusData.humidity.target + statusData.humidity.unit} 
                        colorClass="border-blue-500" 
                        valueClass="text-blue-600"
                        onValueChange={handleHumidityChange}
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