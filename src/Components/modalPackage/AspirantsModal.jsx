import React from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";

const AspirantsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const aspirants = [
        { id: 1, name: "Juan Pérez", stage: "Postulación" },
        { id: 2, name: "Maria Gómez", stage: "Entrevista" },
        { id: 3, name: "Carlos López", stage: "Prueba Técnica" },
    ];

    const nextStage = {
        "Postulación": "Entrevista",
        "Entrevista": "Prueba Técnica",
        "Prueba Técnica": "Oferta",
        "Oferta": "Contratado",
    };

    return (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50 ">
            <div className="bg-white rounded-2xl shadow-xl w-[100%] max-w-lg p-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">Gestión de Envío</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-all">
                        <FaTimes size={22} />
                    </button>
                </div>

                <div className="mt-5 space-y-4">
                    {aspirants.map((aspirant) => (
                        <div 
                            key={aspirant.id} 
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md transition-shadow duration-300"
                        >
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{aspirant.name}</p>
                                <p className="text-sm text-gray-500">Etapa: {aspirant.stage}</p>
                            </div>
                            {nextStage[aspirant.stage] && (
                                <button
                                    className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-purple-700 transition-all duration-300"
                                >
                                    <span>Avanzar</span>
                                    <FaArrowRight />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AspirantsModal;
