import React, { useState } from "react";
import Header from "../Components/headerPackage/Header";
import RadicadoModal from "../Components/modalPackage/RadicadoModal";

export default function ProcessInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div>
            {/* Header siempre visible */}
            <Header />

            {/* Contenedor principal ajustado con padding para el header */}
            <div className="min-h-screen bg-gray-100 p-8 mt-32">
                <div className="container mx-auto flex flex-col lg:flex-row gap-8">
                    
                    {/* Sección grande a la izquierda */}
                    <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-8 relative">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">¿Cómo es el proceso?</h1>
                        <p className="text-gray-600 leading-relaxed">
                            En esta sección, encontrará información detallada sobre cada etapa del proceso de selección en la compañía, desde la postulación inicial hasta la contratación.
                        </p>
                        <p className="text-gray-600 mt-2">Estas son las etapas del proceso:</p>

                        {/* Contenedor de etapas con límite de visibilidad */}
                        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                            <li>
                                Envío de hoja de vida.
                                <ul className="ml-6">
                                    <li>Este es el primer paso en donde revisaremos su hoja de vida.</li>
                                </ul>
                            </li>
                            <li>
                                Revisión de hoja de vida.
                                <ul className="ml-6">
                                    <li>En este momento revisamos la hoja de vida y vemos si es apto para el puesto.</li>
                                </ul>
                            </li>
                            <li>
                                Citación para la entrevista.
                                <ul className="ml-6">
                                    <li>En este paso se realiza la citación ya sea presencial o virtual para la entrevista.</li>
                                </ul>
                            </li>
                            <li>
                                Entrevista.
                                <ul className="ml-6">
                                    <li>En este momento se realiza la entrevista y se decide si es apto para el puesto.</li>
                                </ul>
                            </li>
                            <li>
                                Envío de pruebas técnicas.
                                <ul className="ml-6">
                                    <li>Se realiza el envío al aspirante de las pruebas técnicas según el puesto al que se postuló.</li>
                                </ul>
                            </li>
                            
                            {/* Botón "Leer más" colocado justo después de Envío de pruebas técnicas */}
                            {!isExpanded && (
                                <button
                                    onClick={toggleExpand}
                                    className="mt-4 text-purple-600 hover:underline font-semibold"
                                >
                                    Leer más
                                </button>
                            )}
                            
                            {/* Etapas ocultas hasta que se expanda */}
                            <div className={`${isExpanded ? "block" : "hidden"}`}>
                                <li>
                                    Revisión de pruebas técnicas.
                                    <ul className="ml-6">
                                        <li>Se realiza una calificación de la prueba técnica y se valora si cumple con lo requerido o no.</li>
                                    </ul>
                                </li>
                                <li>
                                    Contratación.
                                    <ul className="ml-6">
                                        <li>Esta es la etapa final donde se realizan los exámenes médicos, papeleo y finalmente la contratación.</li>
                                    </ul>
                                </li>
                                
                                {/* Botón "Leer menos" */}
                                <button
                                    onClick={toggleExpand}
                                    className="mt-4 text-purple-600 hover:underline font-semibold"
                                >
                                    Leer menos
                                </button>
                            </div>
                        </ul>
                    </div>

                    {/* Secciones pequeñas a la derecha */}
                    <div className="lg:w-1/3 flex flex-col gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Documentos requeridos</h2>
                            <p className="text-gray-600">
                                Asegúrate de tener todos los documentos necesarios listos antes de iniciar el proceso. Esto puede incluir:
                            </p>
                            <ul className="mt-4 space-y-1 list-disc list-inside text-gray-600">
                                <li>Hoja de vida actualizada.</li>
                                <li>Certificados de estudios.</li>
                                <li>Referencias laborales.</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Estado del proceso</h2>
                            <p className="text-gray-600">
                                Si ya realizaste la postulación correctamente, puedes ver cómo va tu proceso presionando el siguiente botón.
                            </p>
                            <button
                                aria-describedby="tier-company"
                                className="flex items-center justify-center w-full px-6 py-2.5 mt-3 text-center text-white duration-200 bg-black border-2 border-black rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                                onClick={handleModalOpen}
                            >
                                Consultar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && <RadicadoModal onClose={handleModalClose} />}
        </div>
    );
}