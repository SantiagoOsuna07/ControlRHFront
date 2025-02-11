import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";

export default function OffersList() {
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updatedOffer, setUpdatedOffer] = useState({
        offerName: "",
        offerDescription: "",
        status: true
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("No se encontró el token. Inicia sesión nuevamente.");
                    return;
                }

                const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Offers/full-offers", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                setOffers(data);
            } catch (error) {
                console.error("Error al cargar las ofertas:", error);
            }
        };

        fetchOffers();
    }, []);

    const handleEditClick = (offer) => {
        setSelectedOffer(offer);
        setUpdatedOffer({
            offerName: offer.offerName,
            offerDescription: offer.offerDescription,
            status: offer.status
        });
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedOffer((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No se encontró el token.");
                return;
            }

            if (!selectedOffer) {
                console.error("No hay oferta seleccionada para actualizar.");
                return;
            }

            const response = await fetch(`http://192.168.40.106/Finanzauto.ControlRH.Api/api/Offers/update-offer?id=${selectedOffer.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedOffer)
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            setIsEditModalOpen(false);
            setOffers((prev) =>
                prev.map((offer) =>
                    offer.id === selectedOffer.id ? { ...offer, ...updatedOffer } : offer
                )
            );
        } catch (error) {
            console.error("Error al actualizar la oferta:", error);
        }
    };

    return (
        <div>
            <LoggedHeader />
            <div className="container mx-auto px-4 py-20 pt-36">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Ofertas</h1>

                <div className="bg-white p-4 shadow-md rounded-lg">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Titulo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length > 0 ? (
                                offers.map((offer) => (
                                    <tr key={offer.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{offer.offerName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{offer.offerDescription}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleEditClick(offer)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500 py-4">
                                        No hay ofertas disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Editar Oferta</h2>

                            <label className="block mb-2">
                                <span className="text-gray-700">Titulo</span>
                                <input 
                                    type="text"
                                    name="offerName"
                                    value={updatedOffer.offerName}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-2 border rounded-md"
                                />
                            </label>

                            <label className="block mb-2">
                                <span className="text-gray-700">Descripción</span>
                                <textarea
                                    name="offerDescription"
                                    value={updatedOffer.offerDescription}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-2 border rounded-md"
                                />
                            </label>

                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={updatedOffer.status}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <span className="text-gray-700">Oferta Activa</span>
                            </label>

                            <div className="flex justify-end space-x-2">
                                <button 
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={handleSaveChanges}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}