import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/headerPackage/Header";

const etapas = [
    "Análisis de hoja de vida",
    "Entrevista técnica",
    "Prueba técnica",
    "Contratación"
];

const ProcessState = () => {
    const { state } = useLocation();
    const { radicado } = state || {};
    const [estadoProceso, setEstadoProceso] = useState(null);

    useEffect(() => {
        if (radicado) {
            const fetchEstadoProceso = async () => {
                try {
                    const response = await fetch(
                        `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Candidate/validate-fileNumber/${radicado}`
                    );

                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del proceso");
                    }

                    const data = await response.json();

                    const estado = {
                        nombre: data.nameCandidate,
                        etapaActual: data.process.progressId,
                        detalles: data.process.nameProcess,
                    };
                    setEstadoProceso(estado);
                } catch (error) {
                    console.error("Error al obtener el estado del proceso:", error);
                }
            };

            fetchEstadoProceso();
        }
    }, [radicado]);

    if (!estadoProceso) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="p-8">
            <Header />
            <div className="text-center mb-8 mt-32">
                <h1 className="text-3xl font-bold">¡Hola, {estadoProceso.nombre}!</h1>
                <p className="mt-4 text-xl">Tu proceso va así:</p>
            </div>

            <div className="relative mb-8">
                <div className="h-2 bg-gray-300 rounded-full">
                    <div 
                        className="h-2 bg-purple-600 rounded-full"
                        style={{ width: `${(estadoProceso.etapaActual / etapas.length) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2">
                    {etapas.map((etapa, index) => (
                        <div
                            key={index}
                            className={`text-sm ${index < estadoProceso.etapaActual ? "text-purple-600" : "text-gray-500"}`}
                        >
                            {etapa}
                        </div>
                    ))}
                </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4">
                <h2 className="text-xl font-semibold">Actualmente estás en el paso:</h2>
                <p className="mt-2 text-lg">{etapas[estadoProceso.etapaActual]}</p>
                <p className="mt-2 text-gray-600">{estadoProceso.detalles}</p>
            </div>
        </div>
    );
};

export default ProcessState;
