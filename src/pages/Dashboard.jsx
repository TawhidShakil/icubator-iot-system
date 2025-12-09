import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MetricCard from '../components/Card';
import StatusCard from '../components/StatusBadge';
import ProgressSection from '../components/ProgressSection';
import { controlsRef, onValue, set, ref, child } from '../firebase'; 

// ডামি ডেটা যা ফায়ারবেস থেকে আসবে না
const DUMMY_DATA = {
    ventilation: '01:30:10',
    turnInterval: '6 Hours',
    progress: { day: 10, total: 21, hatchDate: '15/05/2026' },
};

// ইনিশিয়াল ডেটা
const initialData = {
    temperature: 0,
    humidity: 0,
    target_temp: 0,
    target_humidity: 0,
    heat_1_status: 'OFF',
    fan_status: 'OFF',
    alerts: 'CONNECTING...',
};

// সংশোধিত সেফ পার্সিং ফাংশন
const safeParse = (value) => {
    if (value === null || value === undefined) return 0;
    
    const strValue = String(value).trim();
    const parsed = parseFloat(strValue);
    
    return isNaN(parsed) ? 0 : parsed;
};


const Dashboard = () => {
    const [statusData, setStatusData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);

    // ********** FIREBASE REAL-TIME SUBSCRIPTION **********
    useEffect(() => {
        // controlsRef.parent হলো incubator_101
        const unsubscribe = onValue(controlsRef.parent, (snapshot) => {
            const data = snapshot.val();
            
            // ডেটা ডাম্প ডিবাগিং:
            console.log("--- DEEP FIREBASE DATA DUMP ---");
            console.log("Full Data Structure:", data);
            console.log("-------------------------------");
            
            if (data && data.controls) { // realtime_data না থাকলেও টার্গেট টেম্প দেখানোর জন্য শর্ত শিথিল করা হলো
                // realtime_data যদি না থাকে, তবে সেটি null হবে, কিন্তু controls থাকলে টার্গেট টেম্প দেখাবে
                const realtime = data.realtime_data || {}; // realtime_data না থাকলে খালি অবজেক্ট ব্যবহার করা হলো
                const controls = data.controls;
                
                //🔥 সহজভাবে পার্স করা মান চেক করুন
                const parsedTargetTemp = safeParse(controls.target_temp);

                setStatusData({
                    // realtime.temperature যদি না থাকে, তবে safeParse 0 রিটার্ন করবে
                    temperature: safeParse(realtime.temperature), 
                    humidity: safeParse(realtime.humidity),
                    target_temp: parsedTargetTemp, // সরাসরি পার্স করা মান ব্যবহার করা হলো
                    target_humidity: safeParse(controls.target_humidity),
                    
                    // রিয়েলটাইম স্ট্যাটাস না থাকলে 'OFF' বা 'ERROR' দেখাবে
                    heat_1_status: realtime.heat_1_status || 'OFF',
                    fan_status: realtime.fan_status || 'OFF',
                    alerts: realtime.system_status || 'SYSTEM OK', // Defaulting to OK if status is missing
                    ventilation: DUMMY_DATA.ventilation,
                    turnInterval: DUMMY_DATA.turnInterval,
                });
                setIsLoading(false);
            } else {
                setStatusData(prev => ({...prev, alerts: isLoading ? 'CONNECTING...' : 'NO DATA FOUND'}));
                setIsLoading(false);
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
            setStatusData(prev => ({...prev, alerts: 'CONNECTION ERROR'}));
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [isLoading]);

    // ********** FIREBASE WRITE FUNCTIONS **********
    const handleHeatingChange = (newValue) => {
        const numericValue = parseFloat(newValue);
    
        if (isNaN(numericValue)) {
            console.error('Error: Invalid temperature value provided.');
            return; 
        }
        set(child(controlsRef, 'target_temp'), numericValue) // সংখ্যা হিসেবে Firebase-এ পাঠানো হচ্ছে
            .then(() => console.log('Target Temp Updated Successfully!'))
            .catch((error) => console.error('Error updating target temp:', error));
    };

    const handleHumidityChange = (newValue) => {
        set(child(controlsRef, 'target_humidity'), parseFloat(newValue)) // নিশ্চিত করা হলো যে humidity ও যেন সংখ্যা হিসেবে সেভ হয়
            .then(() => console.log('Target Humidity Updated Successfully!'))
            .catch((error) => console.error('Error updating target humidity:', error));
    };


    const indicators = [
        { label: 'HEAT 1', status: statusData.heat_1_status },
        { label: 'FAN', status: statusData.fan_status },
        { label: 'HEAT 2', status: 'OFF' }, 
        { label: 'WET', status: 'IDLE' },
        { label: 'WINGS', status: 'STOPPED', colSpan: true },
    ];


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
                    
                    {/* Heating Control Card (Temperature) */}
                    <MetricCard 
                        title="HEATING CONTROL" 
                        value={statusData.temperature.toFixed(1)}
                        unit="°C" 
                        target={(statusData.target_temp || 0).toFixed(1)} // JSX রেন্ডারিংয়ে সুরক্ষা দেওয়া হলো
                        colorClass="border-red-500" 
                        valueClass="text-red-600"
                        onValueChange={handleHeatingChange} 
                    />

                    {/* Humidity Control Card */}
                    <MetricCard 
                        title="HUMIDITY CONTROL" 
                        value={statusData.humidity.toFixed(0)}
                        unit="%" 
                        target={(statusData.target_humidity || 0).toFixed(0)} // JSX রেন্ডারিংয়ে সুরক্ষা দেওয়া হলো
                        colorClass="border-blue-500" 
                        valueClass="text-blue-600"
                        onValueChange={handleHumidityChange} 
                    />

                    {/* Turn Cycle / Ventilation Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-gray-500 mb-2">VENTILATION CONTROL</h3>
                        <p className="text-4xl font-extrabold text-green-600 mb-2">{DUMMY_DATA.ventilation}</p>
                        <h3 className="text-lg font-semibold text-gray-500 mb-2">TURN CYCLE</h3>
                        <p className="text-sm text-gray-500">Interval: {DUMMY_DATA.turnInterval}</p>
                    </div>

                    {/* Alarm & Status Card */}
                    <StatusCard 
                        alerts={statusData.alerts} 
                        indicators={indicators} 
                    />
                </div>
                
                <ProgressSection 
                    currentDay={DUMMY_DATA.progress.day} 
                    totalDays={DUMMY_DATA.progress.total} 
                    hatchDate={DUMMY_DATA.progress.hatchDate} 
                />

            </main>

            <footer className="mt-10 p-4 text-center text-xs text-gray-500 border-t">
                @All Rights Reserved By NextGenious
            </footer>
        </div>
    );
};

export default Dashboard;