import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeaderOf from "../Components/headerPackage/LoggedHeaderOf";
import Card from "../Components/cardPackage/Card";
import SuccessNotification from "../Components/notificationsPackage/SuccessNotification";
import ErrorNotification from "../Components/notificationsPackage/ErrorNotication";

export default function AdminDashboard({ username, onLogout }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const confirmNavigation = () => {
        closeModal();
        setSuccessMessage("Redirigiendo a Evaluaciones de Desempeño...");

        setTimeout(() => {
            window.location.href = "http://192.168.40.106/RRHH.Client/";
        })
    };

    return (
        <div>
            <LoggedHeaderOf username="Admin" onLogout={onLogout} />

            <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
                <div className="flex flex-wrap gap-8 justify-center w-full mt-1">
                    <Card   
                        title="Lista de aspirantes"
                        description="Ver todos los aspirantes que hay en el momento."
                        onClick={() => {
                            setSuccessMessage("Cargando Lista de Aspirantes...");  
                            navigate("/applicants-list");
                        }}
                    />
                    <Card
                        title="Inventario Empleados"
                        description="Gestiona el inventario de la empresa."
                        onClick={() => {
                            setSuccessMessage("Cargando Inventario de Empleados...");  
                            navigate("/hires-inventory");
                        }}
                    />
                    <Card
                        title="Hojas de vida"
                        description="Gestiona todas las hojas de vida"
                        onClick={() => {
                            setSuccessMessage("Cargando Hojas de Vida...")
                            navigate("/employees-list")
                        }}
                    />
                    <Card
                        title="Evaluaciones de desempeño"
                        description="Redirige a evaluaciones de desempeño."
                        onClick={openModal}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-fadeIn">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">¿Estás seguro?</h2>
                        <p className="text-gray-600 mb-6">
                            ¿Deseas ir a la página de evaluaciones de desempeño?
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button 
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                onClick={confirmNavigation}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {successMessage && (
                <SuccessNotification message={successMessage} onClose={() => setSuccessMessage(null)} />
            )}
            {errorMessage && (
                <ErrorNotification message={errorMessage} onClose={() => setErrorMessage(null)} />
            )}
        </div>
    );
}