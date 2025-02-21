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
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Inventario de Empleados</h1>

                <div className="bg-white p-6 shadow-lg rounded-xl overflow-hidden">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-[#602ba4] text-white text-lg">
                            <tr>
                                <th className="border border-gray-300 px-6 py-3 text-left">Nombre</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Correo</th>
                                <th className="border border-gray-300 px-6 py-3 text-left">Cargo</th>
                                <th className="border border-gray-300 px-6 py-3 text-center">Inventario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newHires.length > 0 ? (
                                newHires.map((hire) => (
                                    <tr key={hire.id} className="hover:bg-gray-100 text-gray-700">
                                        <td className="border border-gray-300 px-6 py-3">{hire.employeeName}</td>
                                        <td className="border border-gray-300 px-6 py-3">{hire.email}</td>
                                        <td className="border border-gray-300 px-6 py-3">{hire.position}</td>
                                        <td className="border border-gray-300 px-6 py-3 text-center">
                                            <button
                                                className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
                                                onClick={() => handleViewClick(hire.id)}
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500 text-lg">
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
