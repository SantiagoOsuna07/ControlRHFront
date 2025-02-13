import React from "react";

export default function Card({ title, description, onClick }) {
    return (
        <div 
            className="relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer text-2xl font-bold bg-[#602ba4] text-white"
            onClick={onClick}
        >
            <div className="z-10 absolute w-full h-full peer"></div>

            {/* Círculo de la parte superior */}
            <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-[#8148d4] transition-all duration-500"></div>
            
            {/* Círculo de la parte inferior con descripción */}
            <div className="absolute flex flex-col text-lg text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-[#8148d4] transition-all duration-500">
                <p className="px-4">{description}</p>
            </div>            
            
            {/* Título fijo en el centro */}
            <div className="w-full h-full flex items-center justify-center text-center uppercase">
                {title}
            </div>
        </div>
    );
}
