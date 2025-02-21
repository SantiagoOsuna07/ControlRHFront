import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const SendTestModal = ({ isOpen, onClose, candidateId }) => {
    const [selectedTest, setSelectedTest] = useState("");
    const [testOptions, setTestOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const fetchTests = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");
            if (!token) {
                setError("No se encontró un token de autenticación.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Test/full-test", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener las pruebas técnicas.");
                }

                const data = await response.json();
                setTestOptions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, [isOpen]);

    const resetModalState = () => {
        setSelectedTest("");
        setError(null);
        setSuccessMessage("");
        setShowConfirmation(false);
    };

    const handleClose = () => {
        resetModalState();
        onClose();
    };

    const handleSendTest = async () => {
        const token = localStorage.getItem("token");

        if (!token || !candidateId || !selectedTest) {
            setError("Falta el token de autenticación, el ID del candidato o la prueba seleccionada.");
            return;
        }

        setSending(true);
        setError(null);
        setSuccessMessage("");

        const requestUrl = `http://192.168.40.106/Finanzauto.ControlRH.Api/api/Test/send-test/${candidateId}/${selectedTest}`;


        try {
            const response = await fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(`Error al enviar la prueba técnica: ${responseText}`);
            }

            setSuccessMessage("Prueba enviada con éxito.");
            setTimeout(handleClose, 2000); // Cierra el modal después de 2s
        } catch (err) {
            setError(err.message);
        } finally {
            setSending(false);
            setShowConfirmation(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">Envío Pruebas Técnicas</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition-all">
                        <FaTimes size={22} />
                    </button>
                </div>

                {loading && <p className="text-center text-gray-600 mt-4">Cargando pruebas...</p>}
                {error && <p className="text-center text-red-600 mt-4">Error: {error}</p>}
                {successMessage && <p className="text-center text-green-600 mt-4">{successMessage}</p>}

                {!loading && !error && (
                    <div className="mt-5">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Seleccione una prueba técnica:
                        </label>
                        <select
                            value={selectedTest}
                            onChange={(e) => setSelectedTest(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="" disabled>Seleccionar...</option>
                            {testOptions.map((test) => (
                                <option key={test.id} value={test.id}>
                                    {test.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={handleClose} 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => setShowConfirmation(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                        disabled={!selectedTest || sending}
                    >
                        {sending ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-800">¿Está seguro de enviar la prueba técnica?</h3>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSendTest}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                                disabled={sending}
                            >
                                {sending ? "Enviando..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendTestModal;
