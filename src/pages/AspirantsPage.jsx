import React, { useEffect, useState } from "react";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import SendTestModal from "../Components/modalPackage/SendTestModal";

const AspirantsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [aspirants, setAspirants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAspirants = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No se encontró un token de autenticación.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Candidate/filter-process?processId=3", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los aspirantes. Verifica tu autenticación.");
                }

                const data = await response.json();
                setAspirants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAspirants();
    }, []);

    const handleOpenModal = (candidateId) => {
        setSelectedCandidateId(candidateId);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <LoggedHeader />
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mt-32">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Gestión de Pruebas Técnicas
                </h2>

                {loading && <p className="text-center text-gray-600">Cargando aspirantes...</p>}
                {error && <p className="text-center text-red-600">Error: {error}</p>}

                {!loading && !error && (
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
                            {aspirants.length > 0 ? (
                                aspirants.map((aspirant) => (
                                    <tr key={aspirant.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{aspirant.nameCandidate}</td>
                                        <td className="p-3">{aspirant.type}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleOpenModal(aspirant.id)}
                                                className="bg-purple-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-purple-700 transition-all"
                                            >
                                                Enviar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center p-3 text-gray-600">
                                        No hay aspirantes en este proceso.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            </div>

            <SendTestModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                candidateId={selectedCandidateId}
            />
        </div>
    );
};

export default AspirantsPage;
