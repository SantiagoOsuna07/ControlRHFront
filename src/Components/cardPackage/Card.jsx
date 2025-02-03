import React from "react";

export default function Card({ title, description, onClick }) {
    return (
        <div 
            className="relative overflow-hidden w-64 h-80 mt-24 rounded-3xl cursor-pointer text-2xl font-bold bg-[#602ba4]"
            onClick={onClick}
        >
            <div className="z-10 absolute w-full h-full peer"></div>

            <div className="absolute peer-hover:-top-20 peer-hover:h-[140%] -top-32 -left-16 w-32 h-48 rounded-full bg-purple-500 transition-all duration-500"></div>
            
            <div className="absolute flex flex-col text-lg text-center text-gray-50 items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-52 rounded-full bg-purple-500 transition-all duration-500">
                <p className="-mb-5">{description}</p>
            </div>            
            <div className="w-full h-full text-gray-200 flex text-center items-center justify-center uppercase">
                {title}
            </div>
        </div>
    );
}