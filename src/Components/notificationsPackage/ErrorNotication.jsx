import React, { useEffect } from "react";

const ErrorNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between">
            <span className="font-semibold">{message}</span>
            <button
                onClick={onClose}
                className="ml-4 bg-red-800 hover:bg-red-900 text-white font-bold py-1 px-3 rounded"
            >
                X
            </button>
        </div>
    );
};

export default ErrorNotification;