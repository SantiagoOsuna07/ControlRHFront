import React, { useState } from "react";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import crearOfertaImg from "../assets/Crear.png";
import editarOfertaImg from "../assets/Edit.png";

export default function Offers() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <LoggedHeader />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-20 pt-36 text-center">
        {/* Título mejorado */}
        <h1 className="text-5xl font-extrabold text-black mb-12 relative inline-block">
          Gestión de Ofertas
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-2 rounded-full"></span>
        </h1>

        {/* Contenedor de los botones/cards */}
        <div className="flex justify-center space-x-14">
          {/* Card Crear Oferta */}
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

          {/* Card Editar Oferta */}
          <div
            className="m-6 group px-16 py-12 bg-white rounded-lg flex flex-col items-center justify-center gap-6 relative after:absolute after:h-full after:bg-[#d0b3ff] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0"
            onClick={() => setIsEditModalOpen(true)}
          >
             <img
              src={editarOfertaImg}
              alt="Crear Oferta"
              className="w-32 h-32 object-cover rounded-full"
            />

            <p className="font-semibold text-gray-700 tracking-wider text-2xl group-hover:text-white">
              Editar Oferta
            </p>
          </div>
        </div>
      </div>

      {/* Modal Crear Oferta */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Crear Oferta</h2>
            <p>Aquí irá el contenido del formulario de creación.</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Editar Oferta */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Oferta</h2>
            <p>Aquí irá el contenido del formulario de edición.</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}