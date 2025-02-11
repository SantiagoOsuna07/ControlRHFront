import React, { useEffect, useState } from "react";
import Header from "../Components/headerPackage/Header";
import ModalPostulacion from "../Components/modalPackage/ModalPostulacion";

export default function AvailablePositions() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobTitle, setSelectedJobTitle] = useState("");
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Offers/full-offers");

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                setOffers(data);
            } catch (error) {
                setError("Error al obtener las ofertas. Inténtalo nuevamente.");
                console.error("Error al cargar las ofertas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const handleModalOpen = (jobTitle) => {
        setSelectedJobTitle(jobTitle); // Guardamos el nombre del puesto seleccionado
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedJobTitle(""); // Limpiamos el puesto seleccionado al cerrar el modal
    };

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gray-100 p-8 mt-32">
                <div className="container mx-auto flex flex-col gap-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                            ¡Explora las ofertas disponibles en nuestra empresa!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 text-center">
                            Actualmente, tenemos varias vacantes para unirte a nuestro equipo. Explora las oportunidades y elige la que más se ajuste a tu perfil.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Vacantes Disponibles
                        </h2>

                        {loading ? (
                            <p className="text-center text-gray-500">Cargando ofertas...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : offers.length === 0 ? (
                            <p className="text-center text-gray-500">No hay ofertas disponibles.</p>
                        ) : (
                            <ul className="space-y-4">
                                {offers.map((offer) => (
                                    <li key={offer.id} className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-purple-50 transition-all duration-300">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">{offer.offerName}</h3>
                                                <p className="text-gray-600">{offer.offerDescription}</p>
                                            </div>
                                            <button
                                                className="ml-4 px-4 py-2 text-sm text-white bg-black border-2 border-black rounded-full hover:bg-transparent hover:text-black transition-colors duration-200 focus:outline-none"
                                                onClick={() => handleModalOpen(offer.offerName)}
                                            >
                                                Postularse
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <ModalPostulacion isOpen={isModalOpen} onClose={handleModalClose} jobTitle={selectedJobTitle} />
            </div>
        </div>
    );
}
