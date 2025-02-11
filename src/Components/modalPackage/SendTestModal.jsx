import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SendTestModal = ({ isOpen, onClose }) => {
    const [selectedTest, setSelectedTest] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const testOptions = ["Prueba Técnica 1", "Prueba Técnica 2", "Prueba Técnica 3"];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">Envío Pruebas Técnicas</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-all">
                        <FaTimes size={22} />
                    </button>
                </div>

                <div className="mt-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Seleccione una prueba técnica:
                    </label>
                    <select
                        value={selectedTest}
                        onChange={(e) => setSelectedTest(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="" disabled>Seleccionar...</option>
                        {testOptions.map((test, index) => (
                            <option key={index} value={test}>{test}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose} 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => setShowConfirmation(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                        disabled={!selectedTest}
                    >
                        Enviar
                    </button>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-800">¿Está seguro de enviar la prueba técnica?</h3>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirmation(false);
                                    onClose();
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendTestModal;
