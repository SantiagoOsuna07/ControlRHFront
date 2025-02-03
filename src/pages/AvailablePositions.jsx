import React, { useState } from "react";
import Header from "../Components/headerPackage/Header";
import ModalPostulacion from "../Components/modalPackage/ModalPostulacion";

export default function AvailablePositions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Asegurar que la variable ofertas está dentro del componente
    const ofertas = [
        { titulo: "Desarrollador Backend", descripcion: "Únete a nuestro equipo para desarrollar la infraestructura detrás de nuestros sistemas." },
        { titulo: "Diseñador UX/UI", descripcion: "Crea experiencias excepcionales para nuestros usuarios a través de diseños intuitivos y funcionales." },
        { titulo: "Gerente de Marketing", descripcion: "Lidera nuestras estrategias de marketing y crecimiento para llegar a nuevos clientes." },
        { titulo: "Analista de Datos", descripcion: "Analiza datos para ayudar a la toma de decisiones estratégicas y mejorar nuestros procesos." }
    ];

    return (
        <div>
            {/* Header siempre visible */}
            <Header />

            {/* Contenedor principal con padding */}
            <div className="min-h-screen bg-gray-100 p-8 mt-32">
                <div className="container mx-auto flex flex-col gap-8">
                    {/* Sección principal con título y mensaje introductorio */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                            ¡Explora las ofertas disponibles en nuestra empresa!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 text-center">
                            Actualmente, tenemos varias vacantes para unirte a nuestro equipo. Explora las oportunidades y elige la que más se ajuste a tu perfil.
                        </p>
                    </div>

                    {/* Lista de puestos disponibles */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Vacantes Disponibles
                        </h2>

                        {/* Lista de ofertas */}
                        <ul className="space-y-4">
                            {ofertas.map((oferta, index) => (
                                <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-purple-50 transition-all duration-300">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">{oferta.titulo}</h3>
                                            <p className="text-gray-600">{oferta.descripcion}</p>
                                        </div>
                                        <button
                                            className="ml-4 px-4 py-2 text-sm text-white bg-black border-2 border-black rounded-full hover:bg-transparent hover:text-black transition-colors duration-200 focus:outline-none"
                                            onClick={handleModalOpen}
                                        >
                                            Postularse
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ModalPostulacion isOpen={isModalOpen} onClose={handleModalClose} />
            </div>
        </div>
    );
}