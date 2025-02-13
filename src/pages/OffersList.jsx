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
                <h1 className="text-3xl font-bold text-gray-800 mb-3 mt-3 text-center">Lista de Ofertas</h1>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-[#602ba4] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Titulo</th>
                                <th className="px-4 py-3 text-left">Descripción</th>
                                <th className="px-4 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length > 0 ? (
                                offers.map((offer) => (
                                    <tr key={offer.id} className="border-b hover:bg-gray-100 transition">
                                        <td className="px-4 py-3">{offer.offerName}</td>
                                        <td className="px-4 py-3">{offer.offerDescription}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                className="flex items-center justify-center w-full px-4 py-3 text-center text-white duration-200 bg-black border-2 border-black rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
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
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            <button
                                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                X
                            </button>

                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Editar Oferta</h2>

                            <label className="block mb-3">
                                <span className="text-gray-700">Título</span>
                                <input
                                    type="text"
                                    name="offerName"
                                    value={updatedOffer.offerName}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </label>

                            <label className="block mb-3">
                                <span className="text-gray-700">Descripción</span>
                                <textarea
                                    name="offerDescription"
                                    value={updatedOffer.offerDescription}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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

                            <div className="flex justify-end space-x-2">
                                <button 
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
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