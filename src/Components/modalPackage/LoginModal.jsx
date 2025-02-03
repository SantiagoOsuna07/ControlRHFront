import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí no validamos el radicado, solo redirigimos a la página ProcessState
        onClose();
        navigate("/process-state");  // Redirige a la página ProcessState sin radicado
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
                        No es necesario ingresar un radicado. Solo haz clic en Entrar para ver el estado.
                    </p>
                </div>

                {/* Formulario */}
                <form className="mx-auto mb-0 mt-8 max-w-md" onSubmit={handleSubmit}>
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