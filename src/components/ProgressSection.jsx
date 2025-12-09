import React from 'react';

const ProgressSection = ({ currentDay, totalDays, hatchDate }) => {
    // Progress calculation
    const progress = (currentDay / totalDays) * 100;

    return (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4">INCUBATION PROGRESS</h3>
            
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-purple-600">Day {currentDay} of {totalDays}</p>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Estimated Hatch Date:</p>
                    <p className="text-md font-medium text-gray-700">{hatchDate}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full h-3">
                <div 
                    className="bg-purple-600 h-3 rounded-full transition-all duration-500" 
                    style={{width: `${progress}%`}} 
                    title="PROGRESS BAR"
                ></div>
            </div>
        </div>
    );
};

export default ProgressSection;