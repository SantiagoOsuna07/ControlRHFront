import React from "react";
import { motion } from "framer-motion";

const ModalPostulacion = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gradient-to-br from-purple-700 to-purple-500 text-white p-8 rounded-2xl shadow-xl w-[400px] relative"
            >
                <button
                    className="absolute top-4 right-4 text-white text-xl font-bold hover:text-gray-300"
                    onClick={onClose}
                >
                    X
                </button>

                <h2 className="text-3xl font-extrabold text-center mb-4">
                    ¿Quieres postularte?
                </h2>
                <p className="text-center text-sm text-gray-200 mb-6">
                    Déjanos tus datos y adjunta tu hoja de vida.
                </p>

                <form className="space-y-4">
                    <input 
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input 
                        type="email"
                        placeholder="Correo"
                        className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input 
                        type="text"
                        placeholder="Celular"
                        className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input 
                        type="file"
                        className="w-full p-3 rounded-md bg-white text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="submit"
                        className="w-full bg-white text-black py-3 rounded-full text-lg font-bold transition-all duration-300"
                    >
                        Enviar
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ModalPostulacion