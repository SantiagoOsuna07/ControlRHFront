import React, { useState } from "react";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import crearOfertaImg from "../assets/Crear.png";
import editarOfertaImg from "../assets/Edit.png";
import CreateOfferModal from "../Components/modalPackage/CreateOfferModal";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <LoggedHeader />

      <div className="container mx-auto px-4 py-20 pt-36 text-center">
        <h1 className="text-5xl font-extrabold text-black mb-12 relative inline-block">
          Gestión de Ofertas
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-2 rounded-full"></span>
        </h1>

        <div className="flex justify-center space-x-14">
          <div
            className="m-6 group px-16 py-12 bg-white rounded-lg flex flex-col items-center justify-center gap-6 relative after:absolute after:h-full after:bg-[#d0b3ff] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <img
              src={crearOfertaImg}
              alt="Crear Oferta"
              className="w-32 h-32 object-cover rounded-full"
            />
            <p className="font-semibold text-gray-700 tracking-wider text-2xl group-hover:text-white">
              Crear Oferta
            </p>
          </div>

          <div
            className="m-6 group px-16 py-12 bg-white rounded-lg flex flex-col items-center justify-center gap-6 relative after:absolute after:h-full after:bg-[#d0b3ff] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0"
            onClick={() => navigate("/offers-list")}
          >
            <img
              src={editarOfertaImg}
              alt="Editar Oferta"
              className="w-32 h-32 object-cover rounded-full"
            />
            <p className="font-semibold text-gray-700 tracking-wider text-2xl group-hover:text-white">
              Editar Oferta
            </p>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateOfferModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={(offer) => {
            console.log("Oferta creada:", offer);
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}