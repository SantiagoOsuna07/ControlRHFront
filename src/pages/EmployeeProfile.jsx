import React, { useEffect, useState } from "react";
import { FaMedal, FaBriefcase, FaEnvelope, FaPhone } from "react-icons/fa";
import LoggedHeader from "../Components/headerPackage/LoggedHeader";
import { useParams } from "react-router-dom";

export default function EmployeeProfile() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const mockEmployee = {
            name: "Juan Pérez",
            position: "Desarrollador Full Stack",
            email: "juan.perez@finanzauto.com",
            phone: "+57 320 123 4567",
            badges: ["Innovador del Año", "Liderazgo Técnico", "Mejor Desarrollador"],
            projects: ["Proyecto A", "Proyecto B", "Proyecto C"],
            skills: ["JavaScript", "React", "Node.js", "C#", "SQL", "Arquitectura de Software"],
        };
        setEmployee(mockEmployee);
    }, [id]);

    const getRandomPercentage = () => Math.floor(Math.random() * 60) + 40;

    if (!employee) return <p className="text-center text-gray-600 mt-10">Cargando...</p>;

    return (
        <div>
            <LoggedHeader />
            <div className="min-h-screen bg-gray-100 py-10 mt-28 flex justify-center">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden p-10">
                    
                    <div className="flex items-center space-x-6 border-b pb-6">
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                            {employee.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{employee.name}</h1>
                            <p className="text-lg text-gray-600">{employee.position}</p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-purple-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Correo</h3>
                                <p className="text-gray-600">{employee.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhone className="text-purple-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Teléfono</h3>
                                <p className="text-gray-600">{employee.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">🏅 Insignias</h3>
                        <div className="flex flex-wrap gap-3">
                            {employee.badges.map((badge, index) => (
                                <span key={index} className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm">
                                    <FaMedal className="mr-2" /> {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 Habilidades</h3>
                        <div className="space-y-4">
                            {employee.skills.map((skill, index) => {
                                const percentage = getRandomPercentage();
                                return (
                                    <div key={index}>
                                        <div className="flex justify-between">
                                            <p className="text-gray-700 font-medium">{skill}</p>
                                            <p className="text-gray-600">{percentage}%</p>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                                            <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">🚀 Proyectos en la empresa</h3>
                        <ul className="grid grid-cols-2 gap-4">
                            {employee.projects.map((project, index) => (
                                <li key={index} className="bg-gray-200 rounded-lg px-4 py-2 flex items-center">
                                    <FaBriefcase className="mr-3 text-purple-600" />
                                    {project}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}