import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";

export default function EmployeesList({ username, onLogout }) {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedBoss, setSelectedBoss] = useState("");
    const [bosses, setBosses] = useState({});

    useEffect(() => {
        const fetchBosses = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error = ("No se encontró el token. Inicia sesión nuevamente.");
                    return;
                }

                const response = await fetch(
                    "http://192.168.40.106/Finanzauto.ControlRH.Api/api/Boss/full-boss", {
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

                if (!Array.isArray(data)) {
                    throw new Error("La respuesta de la API de jefes no es un array.");
                }

                const bossesMap = {};
                data.forEach(boss => {
                    bossesMap[boss.id] = boss.nameBoss;
                });

                setBosses(bossesMap);
            } catch (error) {
                console.error("Error al cargar los jefes:", error);
            }
        };

        fetchBosses();
    }, []);

    useEffect(() => {
        if (Object.keys(bosses).length === 0) return;

        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.error("No se encontró el token. Inicia sesión nuevamente.");
                    return;
                }

                const response = await fetch(
                    "http://192.168.40.106/Finanzauto.ControlRH.Api/api/Employee/full-employees",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Empleados cargados:", data);

                const transformedData = data.map(emp => ({
                    nombre: emp.employeeName,
                    cedula: emp.document,
                    correo: emp.email,
                    cargo: emp.position,
                    jefe: bosses[emp.bossId] || "Desconocido"
                }));

                setEmployees(transformedData);
                setFilteredEmployees(transformedData);
            } catch (error) {
                console.error("Error al cargar los empleados:", error);
            }
        };

        fetchEmployees();
    }, [bosses]);

    const handleFilterChange = (event) => {
        const boss = event.target.value;
        setSelectedBoss(boss);

        if (boss === "") {
            setFilteredEmployees(employees);
        } else {
            setFilteredEmployees(employees.filter(emp => emp.jefe === boss));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <LoggedHeader username="Admin" onLogout={onLogout} />

            <div className="container mx-auto px-4 py-20 pt-36">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Lista de Empleados</h1>

                    <div>
                        <label htmlFor="filter" className="text-gray-700 font-semibold mr-2">Filtrar por Jefe:</label>
                        <select 
                            id="filter"
                            className="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:ring focus:ring-purple-300"
                            value={selectedBoss}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            {Object.values(bosses).map((jefe, index) => (
                                <option key={index} value={jefe}>{jefe}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-[#602ba4] text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Cédula</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Cargo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Jefe</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Hoja de vida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{employee.nombre}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.cedula}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.correo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.cargo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.jefe}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button 
                                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => navigate(`/employee-profile/${employee.cedula}`)}
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500 py-4">
                                        No hay empleados disponibles.
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