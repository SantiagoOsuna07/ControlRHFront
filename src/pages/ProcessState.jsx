import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/headerPackage/Header";

const ProcessState = () => {
    const { state } = useLocation();
    const { radicado } = state || {};
    
    const [estadoProceso, setEstadoProceso] = useState(null);
    const [etapas, setEtapas] = useState([]);

    // 🔹 Cargar todas las etapas desde la API
    useEffect(() => {
        const fetchEtapas = async () => {
            try {
                const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Process/full-processes");
                if (!response.ok) throw new Error("Error al obtener las etapas");
                
                const data = await response.json();
                setEtapas(data);
            } catch (error) {
                console.error("Error al obtener las etapas:", error);
            }
        };

        fetchEtapas();
    }, []);

    // 🔹 Cargar el estado del proceso del aspirante
    useEffect(() => {
        if (radicado) {
            const fetchEstadoProceso = async () => {
                try {
                    const response = await fetch(
                        `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Candidate/validate-fileNumber/${radicado}`
                    );

                    if (!response.ok) throw new Error("Error al obtener el estado del proceso");

                    const data = await response.json();
                    const estado = {
                        nombre: data.nameCandidate,
                        etapaActual: data.process.progressId,
                        detalles: data.process.nameProcess,
                        descripcion: data.process.descriptionProcess, 
                    };
                    setEstadoProceso(estado);
                } catch (error) {
                    console.error("Error al obtener el estado del proceso:", error);
                }
            };

            fetchEstadoProceso();
        }
    }, [radicado]);

    if (!estadoProceso || etapas.length === 0) {
        return <div>Cargando...</div>;
    }

    // 🔹 Buscar la etapa actual del aspirante en la lista de procesos
    const etapaIndex = etapas.findIndex(etapa => etapa.progressId === estadoProceso.etapaActual);
    const etapaFinal = etapaIndex !== -1 ? etapaIndex : 0; // Si no encuentra, poner en la primera etapa

    return (
        <div className="p-8">
            <Header />
            <div className="text-center mb-8 mt-32">
                <h1 className="text-3xl font-bold">¡Hola, {estadoProceso.nombre}!</h1>
                <p className="mt-4 text-xl">Tu proceso va así:</p>
            </div>

            {/* Barra de progreso */}
            <div className="relative mb-8">
                <div className="h-2 bg-gray-300 rounded-full">
                    <div 
                        className="h-2 bg-purple-600 rounded-full"
                        style={{ width: `${((etapaFinal + 1) / etapas.length) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2">
                    {etapas.map((etapa, index) => (
                        <div
                            key={etapa.id}
                            className={`text-sm ${index <= etapaFinal ? "text-purple-600 font-bold" : "text-gray-500"}`}
                        >
                            {etapa.nameProcess}
                        </div>
                    ))}
                </div>
            </div>

            {/* Información de la etapa actual */}
            <div className="border border-gray-300 rounded-lg p-4">
                <h2 className="text-xl font-semibold">Actualmente estás en el paso:</h2>
                <p className="mt-2 text-lg">{etapas[etapaFinal].nameProcess}</p>
                <p className="mt-2 text-gray-600">{estadoProceso.descripcion}</p>
            </div>
        </div>
    );
};

export default ProcessState;
