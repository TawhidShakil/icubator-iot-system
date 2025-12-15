import React, { useState, useEffect } from 'react'; // 🔥🔥 useEffect এখানে যোগ করুন 🔥🔥

// Modal Component for Changing Values
const ChangeValueModal = ({ isOpen, onClose, title, currentValue, targetValue, unit, onSave }) => {
    // targetValue prop-এর মানকে string হিসেবে নিয়ে কাজ করবে।
    const [inputValue, setInputValue] = useState(targetValue.toString());

    // 🔥🔥 সমাধান: prop পরিবর্তন হলে স্টেট আপডেট হবে 🔥🔥
    useEffect(() => {
        // prop (targetValue) পরিবর্তিত হলে, আমরা অভ্যন্তরীণ স্টেট (inputValue) আপডেট করব।
        // এতে মডাল খোলার সময় সঠিক মান দেখাবে।
        setInputValue(targetValue.toString());
    }, [targetValue]);
    // 🔥🔥 সমাধান শেষ 🔥🔥

    if (!isOpen) return null;

    const handleSave = () => {
        // সেভ করার সময় float/number-এ কনভার্ট করে সেভ ফাংশনে পাঠানো হলো
        onSave(parseFloat(inputValue));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0  bg-opacity-50 backdrop-blur-xs"
                onClick={onClose}
            ></div>

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
    
    // targetValue সরাসরি prop হিসেবে Firebase থেকে আসছে
    const targetValue = target;

    const handleChangeValue = () => {
        setIsModalOpen(true);
    };

    const handleSaveValue = (newTargetValue) => {
        // onValueChange ফাংশনটি Dashboard থেকে Firebase-এ লেখার জন্য পাস করা হয়েছে
        if (onValueChange) {
            onValueChange(newTargetValue);
        }
    };

    return (
        <>
            <div 
                className={`relative bg-white p-6 rounded-xl shadow-lg border-l-4 ${colorClass} h-full transition-all duration-200 cursor-pointer`}
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
                    <div className="absolute inset-0  bg-opacity-5 rounded-xl flex items-end justify-center p-12 transition duration-200">
                        <button 
                            onClick={handleChangeValue}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-lg"
                        >
                            Change Target
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

export default MetricCard;