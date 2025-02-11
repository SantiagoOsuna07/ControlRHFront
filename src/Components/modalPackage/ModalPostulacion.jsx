import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ModalPostulacion = ({ isOpen, onClose, jobTitle }) => {
    const [formData, setFormData] = useState({
        type: "",
        nameCandidate: "",
        emailCandidate: "",
        phoneCandidate: "",
        processId: 0,
        status: true,
        CvFile: null,
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, type: jobTitle || "" }));
    }, [jobTitle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, CvFile: e.target.files[0] }));
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.CvFile) {
            alert("Debes adjuntar tu hoja de vida.");
            return;
        }
        if (!validateEmail(formData.emailCandidate)) {
            alert("Por favor ingresa un correo válido.");
            return;
        }
        if (!validatePhone(formData.phoneCandidate)) {
            alert("El número de celular debe tener 10 dígitos.");
            return;
        }

        const data = new FormData();
        data.append("type", formData.type);
        data.append("nameCandidate", formData.nameCandidate);
        data.append("emailCandidate", formData.emailCandidate);
        data.append("phoneCandidate", formData.phoneCandidate);
        data.append("processId", formData.processId);
        data.append("status", formData.status);
        data.append("CvFile", formData.CvFile);

        try {
            const response = await fetch(
                "http://192.168.40.106/Finanzauto.ControlRH.Api/api/Candidate/create-candidate",
                {
                    method: "POST",
                    body: data,
                }
            );

            if (!response.ok) throw new Error("Error al enviar la postulación");

            setIsSuccessModalOpen(true);
        } catch (error) {
            alert("Hubo un error al enviar la postulación");
            console.error(error);
        }
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
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

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            disabled
                            className="w-full p-3 rounded-md bg-gray-300 text-black cursor-not-allowed focus:outline-none"
                        />
                        <input
                            type="text"
                            name="nameCandidate"
                            placeholder="Nombre"
                            value={formData.nameCandidate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <input
                            type="email"
                            name="emailCandidate"
                            placeholder="Correo"
                            value={formData.emailCandidate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <input
                            type="text"
                            name="phoneCandidate"
                            placeholder="Celular"
                            value={formData.phoneCandidate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <input
                            type="file"
                            name="CvFile"
                            onChange={handleFileChange}
                            className="w-full p-3 rounded-md bg-white text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
                            required
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

            {isSuccessModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white text-black p-6 rounded-lg shadow-xl w-[350px] text-center"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-purple-700">
                            ¡Postulación enviada con éxito!
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Tu información ha sido enviada correctamente.
                        </p>
                        <button
                            onClick={closeSuccessModal}
                            className="bg-purple-700 text-white py-2 px-6 rounded-md font-bold hover:bg-purple-800 transition-all"
                        >
                            Cerrar
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default ModalPostulacion;
