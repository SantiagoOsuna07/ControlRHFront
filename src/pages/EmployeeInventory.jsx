import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import { motion } from "framer-motion";

export default function EmployeeInventory() {
    const { id } = useParams();
    const [inventory, setInventory] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalInfo, setModalInfo] = useState({ isOpen: false, message: "", itemKey: "" });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("No se encontró el token. Inicia sesión nuevamente.");
                }

                const inventoryResponse = await fetch(
                    `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Inventory/employee-inventory/${id}?employeId=${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!inventoryResponse.ok) {
                    throw new Error(`Error HTTP: ${inventoryResponse.status} - ${inventoryResponse.statusText}`);
                }

                let inventoryData = await inventoryResponse.json();

                const defaultInventory = {
                    jacket: false,
                    qd: false,
                    businessEmail: false,
                    computer: false,
                    domainUser: false
                };

                inventoryData = { ...defaultInventory, ...inventoryData };

                setInventory(inventoryData);

                const employeeResponse = await fetch(
                    `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Employee/employees/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!employeeResponse.ok) {
                    throw new Error("No se pudo obtener la información del empleado");
                }

                const employeeData = await employeeResponse.json();
                setEmployee(employeeData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [id]);

    // Función para abrir modal de solicitud
    const handleRequestClick = (itemKey, itemName) => {
        setModalInfo({ isOpen: true, message: `¿Desea solicitar ${itemName}?`, itemKey });
    };

    // Función para confirmar solicitud
    const handleConfirmRequest = () => {
        const restrictedItems = ["businessEmail", "computer", "domainUser"];

        if (restrictedItems.includes(modalInfo.itemKey)) {
            setModalInfo({ isOpen: false, message: "", itemKey: "" });
            setErrorModal({
                isOpen: true,
                message: "No se puede solicitar este ítem por este medio. Acérquese a RRHH para poder solicitarlo."
            });
        } else {
            console.log(`Solicitud enviada para ${modalInfo.itemKey}`);
            setModalInfo({ isOpen: false, message: "", itemKey: "" });
        }
    };

    // Función para cerrar modales
    const closeModal = () => setModalInfo({ isOpen: false, message: "", itemKey: "" });
    const closeErrorModal = () => setErrorModal({ isOpen: false, message: "" });

    if (loading) return <div className="text-center mt-20 text-gray-600">Cargando inventario...</div>;
    if (error) return <div className="text-center mt-20 text-red-600">Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <LoggedHeader />

            <div className="container mx-auto py-10 px-6">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    Solicitud de Inventario
                </h1>

                <div className="bg-white p-6 shadow-md rounded-lg w-full mb-8 mt-16">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Información del Trabajador</h2>
                    <p className="text-lg"><strong>Nombre:</strong> {employee?.employeeName || "Desconocido"}</p>
                    <p className="text-lg"><strong>Cargo:</strong> {employee?.position || "No especificado"}</p>
                </div>

                <div className="bg-white p-8 shadow-md rounded-lg w-full">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Elementos Asignados</h2>

                    <div className="space-y-6">
                        {[
                            { key: "qd", label: "QD" },
                            { key: "jacket", label: "Chaqueta" },
                            { key: "businessEmail", label: "Correo Empresarial" },
                            { key: "computer", label: "Computador" },
                            { key: "domainUser", label: "Usuario de Dominio" }
                        ].map(item => (
                            <div key={item.key} className={`flex items-center justify-between p-4 rounded-lg ${inventory?.[item.key] ? 'bg-green-100' : 'bg-red-100'} transition duration-300 ease-in-out hover:scale-105`}>
                                <div className="flex items-center space-x-4">
                                    <input 
                                        type="checkbox" 
                                        checked={inventory?.[item.key]} 
                                        disabled 
                                        className="h-7 w-7 border-2 border-transparent rounded-lg focus:outline-none"
                                    />
                                    <span className="text-lg font-medium">{item.label}</span>
                                </div>

                                {!inventory?.[item.key] && (
                                    <button
                                        className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none transition-all"
                                        onClick={() => handleRequestClick(item.key, item.label)}
                                    >
                                        Solicitar
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {modalInfo.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[350px] text-center">
                        <h2 className="text-2xl font-bold mb-4 text-green-600">Confirmar solicitud</h2>
                        <p className="text-gray-700 mb-6">{modalInfo.message}</p>
                        <button className="bg-gray-400 px-4 py-2 rounded-lg" onClick={closeModal}>Cancelar</button>
                        <button className="bg-green-600 px-4 py-2 ml-4 rounded-lg" onClick={handleConfirmRequest}>Confirmar</button>
                    </div>
                </div>
            )}

            {errorModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[350px] text-center">
                        <h2 className="text-xl font-bold text-red-600">❌ Error</h2>
                        <p className="text-gray-700 mt-4">{errorModal.message}</p>
                        <button className="bg-red-600 px-4 py-2 rounded-lg mt-4" onClick={closeErrorModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
