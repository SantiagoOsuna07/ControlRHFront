import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/headerPackage/Header";
import Card from "../Components/cardPackage/Card";
import RadicadoModal from "../Components/modalPackage/RadicadoModal";
export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleProcessRedirect = () => navigate("/process-info");
    const handleOffersRedirect = () => navigate("available-positions");

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
                <div className="flex gap-8">
                    <div className="mt-16"></div>
                    <Card 
                        title="Como es el proceso" 
                        description="Observar cada etapa de contratación"
                        onClick={handleProcessRedirect}
                    />
                    <Card 
                        title="Consultar estado del proceso" 
                        description="Observar a detalle la etapa del proceso"
                        onClick={handleModalOpen}
                    />
                    <Card 
                        title="Ofertas Disponibles" 
                        description="Ver las ofertas de la empresa"
                        onClick={handleOffersRedirect}
                    />
                </div>
            </div>

            {isModalOpen && <RadicadoModal onClose={handleModalClose} />}
        </div>
    );
}