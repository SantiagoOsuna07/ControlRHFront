import React, { useState } from "react";

export default function CreateOfferModal({ isOpen, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleCreateClick = () => {
        setShowConfirmation(true);
    };

    const confirmCreate = async () => {
        setShowConfirmation(false);
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("No hay token disponible. Inicie sesión nuevamente.");
            setLoading(false);
            return;
        }

        const requestBody = {
            offerName: title,
            offerDescription: description,
            status: true
        };

        try {
            const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Offers/create-offer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Error al crear la oferta.");
            }

            setSuccessMessage("Oferta creada exitosamente.");
            setTitle("");
            setDescription("");

            setTimeout(() => {
                setSuccessMessage(null);
                onClose();
            }, 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl transition-all"
                    >
                        &times;
                    </button>

                    <h2 className="text-2xl font-semibold text-center text-gray-800">Crear Nueva Oferta</h2>
                    <p className="text-sm text-gray-500 text-center mb-4">Ingrese los detalles de la oferta laboral</p>

                    <label className="block text-gray-700 font-medium mb-1">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 px-4 py-2 rounded-lg outline-none transition-all"
                        placeholder="Ejemplo: Desarrollador Full Stack"
                    />

                    <label className="block text-gray-700 font-medium mt-3 mb-1">Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 px-4 py-2 rounded-lg outline-none transition-all resize-none h-28"
                        placeholder="Breve descripción de la oferta..."
                    ></textarea>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

                    <div className="flex justify-center mt-5">
                        <button 
                            onClick={handleCreateClick} 
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md" 
                            disabled={loading}
                        >
                            {loading ? "Creando..." : "Crear Oferta"}
                        </button>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative animate-fadeIn">
                        <button 
                            onClick={() => setShowConfirmation(false)} 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl transition-all"
                        >
                            &times;
                        </button>

                        <h3 className="text-lg font-semibold text-center text-gray-800">¿Estás seguro?</h3>
                        <p className="text-gray-600 text-center mb-4">¿Desea crear esta oferta laboral?</p>

                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={() => setShowConfirmation(false)} 
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmCreate} 
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all" 
                                disabled={loading}
                            >
                                {loading ? "Creando..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}