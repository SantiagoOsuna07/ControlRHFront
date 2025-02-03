import React, { useState } from "react";

export default function CreateOfferModal({ isOpen, onClose, onCreate }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCreateClick = () => {
        setShowConfirmation(true);  // Mostrar la confirmación cuando el usuario haga clic en "Crear"
    };

    const confirmCreate = () => {
        onCreate({ title, description });  // Llamar a onCreate para enviar los datos
        setShowConfirmation(false);  // Cerrar la confirmación
        onClose();  // Cerrar el modal
    };

    if (!isOpen) return null;  // Si isOpen es false, no renderizar el modal

    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">  {/* Aseguramos que el modal esté por encima de otros elementos */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Crear Nueva Oferta</h2>

                <label className="block text-gray-700">Titulo:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded mt-1 mb-3"
                    placeholder="Ingrese el titulo"
                />

                <label className="block text-gray-700">Descripción:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded mt-1 mb-3"
                    placeholder="Ingrese la descripción"
                ></textarea>

                <div className="flex justify-end mt-4">
                    <button onClick={handleCreateClick} className="bg-purple-600 text-white px-4 py-2 rounded">
                        Crear
                    </button>
                </div>
            </div>
        </div>

        {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">  {/* Mantenemos el z-index para la confirmación también */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h3 className="text-lg font-bold mb-4">¿Estás seguro?</h3>
                    <p>¿Desea crear esta oferta laboral?</p>

                    <div className="flex justify-end mt-4">
                        <button onClick={() => setShowConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded-mr-2">
                            Cancelar
                        </button>
                        <button onClick={confirmCreate} className="bg-green-600 text-white px-4 py-2 rounded">
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}