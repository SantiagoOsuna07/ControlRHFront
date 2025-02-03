import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";

export default function NewHiresInventory({ username, onLogout }) {
    const navigate = useNavigate();
    const [newHires, setNewHires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No se encontró un token. Inicia sesión nuevamente.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Employee/full-employees", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.statusText}`);
                }
                const data = await response.json();
                setNewHires(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Manejar clic en "Ver"
    const handleViewClick = (id) => {
        navigate(`/employee-inventory/${id}`);
    };

    if (loading) {
        return <div className="text-center mt-20 text-gray-600">Cargando empleados...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <LoggedHeader username={username} onLogout={onLogout} />

            <div className="container mx-auto px-4 py-20 pt-36">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Inventario Empleados</h1>

                <div className="bg-white p-4 shadow-md rounded-lg">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Cargo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Inventario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newHires.length > 0 ? (
                                newHires.map((hire) => (
                                    <tr key={hire.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{hire.employeeName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{hire.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{hire.position}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition"
                                                onClick={() => handleViewClick(hire.id)}
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-600">
                                        No hay empleados registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}