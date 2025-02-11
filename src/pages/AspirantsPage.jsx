import React, { useState } from "react";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import SendTestModal from "../Components/modalPackage/SendTestModal";

const AspirantsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const aspirants = [
        { id: 1, name: "Juan Pérez", position: "Frontend Developer" },
        { id: 2, name: "Maria Gómez", position: "Backend Developer" },
        { id: 3, name: "Carlos López", position: "Full Stack Developer" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <LoggedHeader />
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mt-32">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Gestión de Pruebas Técnicas
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="p-3 text-left w-[30%]">Nombre</th>
                                <th className="p-3 text-left w-[30%]">Cargo</th>
                                <th className="p-3 text-center w-[20%]">Prueba Técnica</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aspirants.map((aspirant) => (
                                <tr key={aspirant.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{aspirant.name}</td>
                                    <td className="p-3">{aspirant.position}</td>
                                    <td className="p-3 text-center">
                                        <button 
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-purple-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-purple-700 transition-all"
                                        >
                                            Enviar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <SendTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AspirantsPage;
