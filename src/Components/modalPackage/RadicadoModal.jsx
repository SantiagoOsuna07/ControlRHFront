import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RadicadoModal({ onClose }) {
    const [radicado, setRadicado] = useState("");  // Inicializa el estado con una cadena vacía
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar cualquier validación del radicado si es necesario
        onClose();
        navigate("/process-state", { state: { radicado } });  // Pasamos el radicado como parte del estado
    };

    const handleInputChange = (e) => {
        setRadicado(e.target.value);  // Actualiza el estado con el valor ingresado
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                {/* Botón de cierre */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Contenido del modal */}
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Estado Proceso</h1>
                    <p className="mt-4 text-gray-600">
                        Ingresa el número de radicado para ver el estado.
                    </p>
                </div>

                {/* Formulario */}
                <form className="mx-auto mb-0 mt-8 max-w-md" onSubmit={handleSubmit}>
                    {/* Campo de entrada para el radicado */}
                    <div className="mt-4">
                        <label
                            htmlFor="radicado"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Número de Radicado
                        </label>
                        <input
                            id="radicado"
                            type="text"
                            value={radicado}  // Vincula el valor del input al estado radicado
                            onChange={handleInputChange}  // Actualiza el estado cuando el valor cambia
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                            placeholder="Ingrese el número de radicado"
                            required
                        />
                    </div>

                    {/* Botón "Entrar" */}
                    <div className="flex justify-end">
                        <button
                            className="rounded-lg bg-[#4b2277] px-5 py-3 text-sm font-medium text-white hover:bg-[#3a1a5d] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 mt-4"
                            type="submit"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}