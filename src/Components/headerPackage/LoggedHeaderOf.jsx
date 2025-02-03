import React, { useState, useRef, useEffect } from "react";
import ControlImage from "/src/assets/CONTROLRH.png";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoggedHeaderOf = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/")
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#602ba4] text-white p-4 flex items-center justify-between fixed top-0 left-0 w-full shadow-md z-50">
      {/* Logo */}
      <img src={ControlImage} alt="Logo" className="h-24 w-24" />

      {/* Título */}
      <div className="relative inline-block ml-5 ">
        <span className="text-2xl md:text-3xl font-bold">CONTROLRH</span>
        <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-white via-purple-300 to-purple-500 rounded-full"></span>
      </div>

      {/* Espaciador para centrar elementos */}
      <div className="flex-grow"></div>

      {/* Área del usuario con menú */}
      <div className="flex items-center space-x-6">

        <span 
            className="cursor-pointer hover:text-gray-300 font-bold text-2xl"
            onClick={() => navigate("/offers")}
        >
          Ofertas
        </span>

        <div ref={menuRef} className="relative">
        {/* Botón de usuario (con dropdown) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md space-x-3 focus:outline-none relative"
        >
          <FaRegUserCircle className="w-8 h-8 text-gray-700" />
          <span className="font-semibold text-lg">{username}</span>
        </button>

        {/* Menú desplegable */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-full py-2 mt-1 transition-all duration-300">
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout(); // Llamada a la función onLogout
              }}
              className="w-full text-center font-semibold text-black px-4 py-1 mr-2 hover:bg-gray-200 rounded-full"
            >
              Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LoggedHeaderOf;