import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";

export default function ApplicantsList({ username, onLogout }) {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [processes, setProcesses] = useState({});

    useEffect(() => {
        const fetchProcessesAndApplicants = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No se encontró el token. Inicia sesión nuevamente.");
                    return;
                }

                // Obtener procesos
                const processResponse = await fetch(
                    "http://192.168.40.106/Finanzauto.ControlRH.Api/api/Process/full-processes",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!processResponse.ok) {
                    throw new Error(`Error HTTP: ${processResponse.status} - ${processResponse.statusText}`);
                }

                const processData = await processResponse.json();
                const processesMap = {};
                processData.forEach((process) => {
                    processesMap[process.id] = process.nameProcess;
                });

                setProcesses(processesMap);

                // Ahora que tenemos los procesos, obtenemos los aspirantes
                const applicantsResponse = await fetch(
                    "http://192.168.40.106/Finanzauto.ControlRH.Api/api/candidate/full-candidate",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!applicantsResponse.ok) {
                    throw new Error(`Error HTTP: ${applicantsResponse.status} - ${applicantsResponse.statusText}`);
                }

                const applicantsData = await applicantsResponse.json();
                console.log("Aspirantes cargados:", applicantsData);

                const transformedData = applicantsData.map((applicant) => ({
                    nombre: applicant.nameCandidate,
                    correo: applicant.emailCandidate,
                    cargo: applicant.type,
                    estado: processesMap[applicant.processId] || "Desconocido",
                }));

                setApplicants(transformedData);
                setFilteredApplicants(transformedData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchProcessesAndApplicants();
    }, []);

    const handleFilterChange = (event) => {
        const process = event.target.value;
        setSelectedProcess(process);

        if (process === "") {
            setFilteredApplicants(applicants);
        } else {
            setFilteredApplicants(applicants.filter((applicant) => applicant.estado === process));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <LoggedHeader username={username} onLogout={onLogout} />

            <div className="container mx-auto px-4 py-20 pt-36">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">Lista de Aspirantes</h1>

                    <div>
                        <label htmlFor="filter" className="text-gray-700 font-semibold mr-2">
                            Filtrar por proceso:
                        </label>
                        <select
                            id="filter"
                            className="border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:ring focus:ring-purple-300"
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            {Object.values(processes).map((process, index) => (
                                <option key={index} value={process}>
                                    {process}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Cargo al que aspira</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Estado del proceso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplicants.length > 0 ? (
                                filteredApplicants.map((applicant, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{applicant.nombre}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.correo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.cargo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{applicant.estado}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 py-4">
                                        No hay aspirantes disponibles.
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