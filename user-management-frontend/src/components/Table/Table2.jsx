import React from "react";
import users from "./users.json";
import { useState } from "react";

export default function Table2({ onUserSelect }) {
    const [selectedRow, setSelectedRow] = useState(null);

    const keys = Object.keys(users[0]).slice(1);

    // <th className="px-4 py-2 sticky left-0 bg-slate-200">
    //     USUARIO
    // </th>
    // <th className="px-4 py-2">EMAIL</th>
    //     <th className="px-4 py-2">ORGANIZACION</th>
    //     <th className="px-4 py-2">ESTADO</th>
    //         <th className="px-4 py-2">ULTIMA CONEXION</th>

    const handleClick = (user) => {
        setSelectedRow(user.id);
        onUserSelect(user);
    };
    return (
        <div className="overflow-auto rounded-lg border border-slate-200">
            <table className="table-auto w-full">
                <thead>
                    <tr className="text-left whitespace-nowrap bg-slate-200 text-xs md:text-lg font-semibold">
                        {keys.map((key, index) => (
                            <th
                                key={index}
                                className={`px-4 py-2 ${index === 0 ? "sticky left-0 bg-slate-200" : ""}`}
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {users.map((user) => {
                        return (
                            <tr
                                key={user.id}
                                className={`text-left whitespace-nowrap text-xs md:text-lg ${user.id === selectedRow ? "bg-slate-200 transition-colors duration-200" : ""}`}
                                onClick={() => handleClick(user)}
                            >
                                <td
                                    className={`px-4 py-2 font-medium sticky left-0 ${user.id === selectedRow ? "bg-slate-200 transition-colors duration-200" : "bg-white"}`}
                                >
                                    {user.username}
                                </td>
                                <td className="px-4 py-2 font-semibold">
                                    <div className="flex  justify-start">
                                        <div
                                            className={`bg-green-200 rounded-lg p-1
                ${
                    user.role === "admin"
                        ? "bg-blue-200 text-blue-800"
                        : user.role === "employee"
                          ? "bg-orange-100 text-orange-700"
                          : user.role === "manager"
                            ? "bg-green-100 text-green-900"
                            : "bg-gray-200"
                }`}
                                        >
                                            {user.role}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    {user.organization}
                                </td>
                                <td
                                    className={
                                        user.is_logged
                                            ? "px-4 py-2 font-semibold text-green-600"
                                            : "px-4 py-2 font-semibold text-slate-500"
                                    }
                                >
                                    {user.is_logged ? "Activo" : "Inactivo"}
                                </td>
                                <td className="px-4 py-2">
                                    {user.last_connection
                                        ? new Date(
                                              user.last_connection,
                                          ).toLocaleString("es-ES", {
                                              hour12: false,
                                          })
                                        : "N/A"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
