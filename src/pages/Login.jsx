import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState("");
    const [passwd, setPasswd] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://192.168.40.106/Finanzauto.ControlRH.Api/api/Login/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user, // 🔄 Corrección: usar la variable de estado
                    passwd: passwd, // 🔄 Corrección: usar la variable de estado
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.username);
                navigate("/admin-dashboard");
            } else {
                alert("Inicio de sesión fallido. Verifica tus credenciales.");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="h-screen flex bg-gradient-to-r from purple-400 via-purple-500 to-purple-400">
            <div className="w-1/2 flex items-center justify-center">
                <div className="relative">
                    <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 shadow-lg animate-pulse"></div>
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-96 h-96 relative <-10 transform transition duration-500 ease-in-out">
                        <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
                            LOGIN
                        </h2>
                        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                        <form className="space-y-9" onSubmit={handleSubmit}>
                            <input
                                className="w-full h-12 border mb-2 border-gray-800 px-3 rounded-lg"
                                placeholder="Usuario"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                            <input
                                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                                placeholder="Password"
                                type="password"
                                value={passwd}
                                onChange={(e) => setPasswd(e.target.value)}
                                required
                            />
                            <button
                                className="w-full h-12 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                INGRESAR
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 shadow-lg">
                <div className="text-center text-white p-8 rounded-lg">
                    <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
                    <p className="text-lg font-semibold">
                        Ingresa tus credenciales para continuar al sistema.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;