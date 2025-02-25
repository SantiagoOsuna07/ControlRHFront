import React, { useEffect } from "react";

const SuccessNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Se oculta automáticamente después de 5 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between">
            <span className="font-semibold">{message}</span>
            <button
                onClick={onClose}
                className="ml-4 bg-green-800 hover:bg-green-900 text-white font-bold py-1 px-3 rounded"
            >
                ✖
            </button>
        </div>
    );
};

export default SuccessNotification;
