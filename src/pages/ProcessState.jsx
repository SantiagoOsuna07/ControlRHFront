import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/headerPackage/Header";

const ProcessState = () => {
    const { state } = useLocation();
    const { radicado } = state || {};

    const [estadoProceso, setEstadoProceso] = useState(null);
    const [etapas, setEtapas] = useState([]);

    // Cargar todas las etapas desde la API
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

    // Cargar el estado del proceso del aspirante
    useEffect(() => {
        if (radicado) {
            const fetchEstadoProceso = async () => {
                try {
                    const response = await fetch(
                        `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Candidate/validate-fileNumber/${radicado}`
                    );

                    if (!response.ok) throw new Error("Error al obtener el estado del proceso");

                    const data = await response.json();
                    console.log("Datos obtenidos del proceso:", data);

                    // ⚠️ Validación: processId ahora se toma directamente de data.processId
                    if (typeof data.processId === "undefined") {
                        console.error("⚠️ Error: processId no está presente en la respuesta.", data);
                        return;
                    }

                    const estado = {
                        nombre: data.nameCandidate,
                        etapaActual: Number(data.processId), // ✅ Tomamos processId directamente
                        detalles: data.process?.nameProcess || "Sin nombre",
                        descripcion: data.process?.descriptionProcess || "Sin descripción",
                    };

                    console.log("Estado del proceso asignado:", estado);
                    setEstadoProceso(estado);
                } catch (error) {
                    console.error("Error al obtener el estado del proceso:", error);
                }
            };

            fetchEstadoProceso();
        }
    }, [radicado]);

    if (!estadoProceso || etapas.length === 0) {
        return <div className="text-center mt-16">Cargando...</div>;
    }

    // Buscar la etapa actual del aspirante en la lista de procesos
    const etapaEncontrada = etapas.find(etapa => Number(etapa.id) === estadoProceso.etapaActual);
    const etapaFinal = etapaEncontrada ? etapas.indexOf(etapaEncontrada) : 0;

    // Función para obtener la explicación del avance
    const obtenerExplicacionAvance = (etapaId) => {
        switch (etapaId) {
            case 1: // Entrevista
                return "Avanzaste de la Entrevista debido a que cumpliste con los requisitos estipulados en la empresa.";
            case 2: // Examen psicotécnico
                return "Avanzaste del Examen psicotécnico porque obtuviste una puntuación satisfactoria en la evaluación.";
            case 3: // Prueba técnica
                return "Avanzaste de la Entrevista técnica porque demostraste habilidades relevantes para el puesto.";
            case 4: // Evaluación final
                return "Avanzaste a la Evaluación final porque superaste todas las pruebas anteriores.";
            default:
                return "No se puede determinar el avance. Por favor, contacta con Recursos Humanos.";
        }
    };

    return (
        <div>
            <Header />
            <div className="max-w-3xl mx-auto p-8 pt-24">
                <div className="text-center mb-8 mt-16">
                    <h1 className="text-4xl font-extrabold">¡Hola, {estadoProceso.nombre}!</h1>
                    <p className="mt-4 text-xl">Tu proceso va así:</p>
                </div>

                {/* Barra de progreso */}
                <div className="relative mb-12">
                    <div className="h-2 bg-gray-300 rounded-full">
                        <div
                            className="h-2 bg-purple-500 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${((etapaFinal + 1) / etapas.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                        {etapas.map((etapa, index) => (
                            <div
                                key={etapa.id}
                                className={`text-sm ${index <= etapaFinal ? "text-purple-500 font-semibold" : "text-gray-400"}`}
                            >
                                {etapa.nameProcess}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Información de la etapa actual */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Actualmente estás en el paso:</h2>
                    <p className="mt-2 text-lg font-medium text-purple-600">{etapaEncontrada?.nameProcess || "No encontrado"}</p>
                    <p className="mt-4 text-gray-600">{estadoProceso.descripcion}</p>
                </div>

                {/* Información de avance */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">Detalles del avance:</h3>
                    <p className="mt-2 text-gray-700">
                        {obtenerExplicacionAvance(estadoProceso.etapaActual)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProcessState;
