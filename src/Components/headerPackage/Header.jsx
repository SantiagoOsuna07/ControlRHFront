import React from "react";
import { Link } from "react-router-dom";
import ControlImage from "/src/assets/CONTROLRH.png";

const Header = () => {
    return (
      <header className="bg-[#602ba4] text-white p-4 flex items-center justify-between fixed top-0 left-0 w-full shadow-md z-50">
          <img
            src={ControlImage}
            alt="Logo"
            className="h-24 w-24"
          />
          <div class="relative inline-block ml-5">
            <span class="text-2xl md:text-3xl font-bold">
              CONTROLRH
            </span>
          <span class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-white via-purple-300 to-purple-500 rounded-full"></span>
          </div>

          <div className="flex-grow"></div>
          <div class="flex flex-col w-full sm:w-auto sm:flex-row p-4">
            <a href="/login"
                class="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold text-black bg-white leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-gray-800 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
                  INICIAR SESIÓN
                <span class="ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                  </svg>
                </span>
            </a>
          </div>
      </header>
    );
  };
  
  export default Header;