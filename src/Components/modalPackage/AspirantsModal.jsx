import React, { useState } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";

const AspirantsModal = ({ isOpen, onClose}) => {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-700">Gestión de Aspirantes</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="mt-4 space-y-4">
                    {aspirants.map((aspirant) => (
                        <div key={aspirant.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                            <div>
                                <p className="text-lg font-semibold">{aspirant.name}</p>
                                <p className="text-sm text-gray-600">Etapa: {aspirant.stage}</p>
                            </div>
                            {nextStage[aspirant.stage] && (
                                <button
                                    className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-purple-700"
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