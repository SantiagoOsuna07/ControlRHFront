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
            <div className="container mx-auto px-4 py-20 pt-40">
                <h1 className="text-4xl font-bold text-gray-800 mb-5 text-center">Lista de Ofertas</h1>

                <div className="bg-white p-8 shadow-xl rounded-xl">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-[#602ba4] text-white">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left">Título</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Descripción</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length > 0 ? (
                                offers.map((offer) => (
                                    <tr key={offer.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="border border-gray-300 px-6 py-3 text-left">{offer.offerName}</td>
                                        <td className="border border-gray-300 px-6 py-3 text-left">{offer.offerDescription}</td>
                                        <td className="border border-gray-300 px-6 py-3 text-left">
                                            <button
                                                className="px-5 py-2 text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md hover:scale-105 transition-transform font-semibold"
                                                onClick={() => handleEditClick(offer)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500 py-5">
                                        No hay ofertas disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform scale-95 transition-all">
                            <button
                                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                ✖
                            </button>

                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Editar Oferta</h2>

                            <label className="block mb-3">
                                <span className="text-gray-700 font-semibold">Título</span>
                                <input
                                    type="text"
                                    name="offerName"
                                    value={updatedOffer.offerName}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <label className="block mb-3">
                                <span className="text-gray-700 font-semibold">Descripción</span>
                                <textarea
                                    name="offerDescription"
                                    value={updatedOffer.offerDescription}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <label className="flex items-center mb-4 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    name="status"
                                    checked={updatedOffer.status}
                                    onChange={(e) => setUpdatedOffer((prev) => ({ ...prev, status: e.target.checked }))}
                                    className="mr-2 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <span className="text-gray-700">Oferta Activa</span>
                            </label>

                            <div className="flex justify-end space-x-3">
                                <button 
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
                                    onClick={handleSaveChanges}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
