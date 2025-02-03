import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";

export default function EmployeeInventory() {
    const { id } = useParams();
    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const token = localStorage.getItem("token");

                if(!token) {
                    throw new Error("No se encontró el token. Inicia sesión nuevamente.");
                }

                const response = await fetch(`http://192.168.40.106/Finanzauto.ControlRH.Api/api/Inventory/employee-inventory/${id}?employeId=${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setInventory(data);
                setEmployee(data.employee);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-gray-600">Cargando inventario...</div>
    if (error) return <div className="text-center mt-20 text-red-600">Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <LoggedHeader />

            <div className="container mx-auto py-10 px-6">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    Solicitud de Inventario
                </h1>

            <div className="bg-white p-6 shadow-md rounded-lg max-w-3xl mx-auto mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Información del Trabajador</h2>
                <p className="text-lg"><strong>Nombre:</strong> {employee?.name || "Desconocido"}</p>
                <p className="text-lg"><strong>Cargo:</strong> {employee?.position || "No especificado"}</p>
            </div>

            <div className="bg-white p-8 shadow-md rounded-lg max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Elementos Asignados</h2>

                <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                        <input type="checkbox" checked={inventory?.qd} disabled className="h-5 w-5 text-purple-600" />
                        <span className="text-lg">Chaqueta</span>
                    </label>

                    <label className="flex items-center space-x-3">
                        <input type="checkbox" checked={inventory?.jacket} disabled className="h-5 w-5 text-purple-600" />
                        <span className="text-lg">Chaqueta</span>
                    </label>

                    <label className="flex items-center space-x-3">
                        <input type="checkbox" checked={inventory?.qd} disabled className="h-5 w-5 text-purple-600" />
                        <span className="text-lg">QD</span>
                    </label>

                    <label className="flex items-center space-x-3">
                        <input type="checkbox" checked={inventory?.computer} disabled className="h-5 w-5 text-purple-600" />
                        <span className="text-lg">Computador</span>
                    </label>

                    <label className="flex items-center space-x-3">
                        <input type="checkbox" checked={inventory?.status} disabled className="h-5 w-5 text-purple-600" />
                        <span className="text-lg">Estado Activo</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    );
}