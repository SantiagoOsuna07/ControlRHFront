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
            {/* Modal principal */}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                    {/* Botón para cerrar dentro del modal */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl">
                        ✖
                    </button>

                    <h2 className="text-xl font-bold mb-4 text-center">Crear Nueva Oferta</h2>

                    <label className="block text-gray-700">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded mt-1 mb-3"
                        placeholder="Ingrese el título"
                    />

                    <label className="block text-gray-700">Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded mt-1 mb-3"
                        placeholder="Ingrese la descripción"
                    ></textarea>

                    {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                    {successMessage && <p className="text-green-600 text-sm mb-3">{successMessage}</p>}

                    <div className="flex justify-end mt-4">
                        <button onClick={handleCreateClick} className="bg-purple-600 text-white px-4 py-2 rounded" disabled={loading}>
                            {loading ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de confirmación */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                        {/* Botón para cerrar el modal de confirmación dentro del modal */}
                        <button onClick={() => setShowConfirmation(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl">
                            ✖
                        </button>

                        <h3 className="text-lg font-bold mb-4 text-center">¿Estás seguro?</h3>
                        <p className="text-center">¿Desea crear esta oferta laboral?</p>

                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                                Cancelar
                            </button>
                            <button onClick={confirmCreate} className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
                                {loading ? "Creando..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}