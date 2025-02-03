import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OffersList() {
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const token = localStorage.getItem("token");

                if(!token) {
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

                if(!response.ok) {
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

    return (
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
                                    <td className="border border-gray-300 px-4 py-2">{offer.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{offer.description}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button 
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => navigate()}
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
        </div>
    );
}