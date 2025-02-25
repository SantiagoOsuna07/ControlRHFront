import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import SuccessNotification from "../Components/notificationsPackage/SuccessNotification";
import ErrorNotification from "../Components/notificationsPackage/ErrorNotication";

export default function ApplicantsList({ username, onLogout }) {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [processes, setProcesses] = useState({});
    const [modalData, setModalData] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProcessesAndApplicants = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No se encontró el token. Inicia sesión nuevamente.");
                    return;
                }

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
                    throw new Error(`Error HTTP: ${processResponse.status}`);
                }

                const processData = await processResponse.json();
                const processesMap = {};
                processData.forEach((process) => {
                    processesMap[process.id] = process.nameProcess;
                });

                setProcesses(processesMap);

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
                    throw new Error(`Error HTTP: ${applicantsResponse.status}`);
                }

                const applicantsData = await applicantsResponse.json();
                console.log("Aspirantes cargados:", applicantsData);

                const transformedData = applicantsData.map((applicant) => ({
                    id: applicant.id,
                    nombre: applicant.nameCandidate,
                    correo: applicant.emailCandidate,
                    cargo: applicant.type,
                    estado: processesMap[applicant.processId] || "Desconocido",
                    processId: applicant.processId,
                    detenido: applicant.detained || false,
                }));

                setApplicants(transformedData);
                setFilteredApplicants(transformedData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setErrorMessage("Hubo un error al cargar los datos.");
            }
        };

        fetchProcessesAndApplicants();
    }, []);

    const handleFilterChange = (event) => {
        const process = event.target.value;
        setSelectedProcess(process);
        setFilteredApplicants(
            process === "" ? applicants : applicants.filter((applicant) => applicant.estado === process)
        );
    };

    const handleProcessChange = async () => {
        if (!modalData) return;

        const { applicant, newProcessId } = modalData;

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No se encontró el token. Inicia sesión nuevamente.");
            setErrorMessage("No se encontró el token. Inicia sesión nuevamente.");
            return;
        }

        const updatedData = {
            id: applicant.id,
            processId: newProcessId,
            type: applicant.cargo,
            nameCandidate: applicant.nombre,
            emailCandidate: applicant.correo,
            phoneCandidate: applicant.phone || "0000000000",
        };

        try {
            const response = await fetch(
                `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Candidate/update-processId?id=${applicant.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            console.log("✅ Proceso actualizado correctamente");
            setSuccessMessage("Proceso actualizado correctamente.")

            // Actualizar la UI inmediatamente después del cambio
            setApplicants((prev) =>
                prev.map((app) =>
                    app.id === applicant.id
                        ? { ...app, estado: processes[newProcessId], processId: newProcessId }
                        : app
                )
            );

            setFilteredApplicants((prev) =>
                prev.map((app) =>
                    app.id === applicant.id
                        ? { ...app, estado: processes[newProcessId], processId: newProcessId }
                        : app
                )
            );
        } catch (error) {
            console.error("Error en handleProcessChange:", error);
            setErrorMessage("Error al actualizar el proceso.")
        }

        setModalData(null); // Cerrar modal después de actualizar
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

                {successMessage && <SuccessMessage message={successMessage} />}
                {errorMessage && <ErrorMessage message={errorMessage} />}

                <div className="bg-white p-4 shadow-md rounded-lg">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-[#602ba4] text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Correo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Cargo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Estado del proceso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplicants.map((applicant, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{applicant.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{applicant.correo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{applicant.cargo}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={applicant.processId}
                                            className="border rounded-md px-2 py-1"
                                            onChange={(e) =>
                                                setModalData({
                                                    applicant,
                                                    newProcessId: parseInt(e.target.value),
                                                })
                                            }
                                        >
                                            {Object.entries(processes).map(([id, name]) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p>¿Seguro que deseas cambiar el proceso de {modalData.applicant.nombre}?</p>
                        <button onClick={handleProcessChange} className="bg-green-500 text-white px-4 py-2 rounded">Confirmar</button>
                        <button onClick={() => setModalData(null)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
