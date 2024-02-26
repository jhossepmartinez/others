import React, { useState } from "react";
import users from "./users.json";
import "./Table.css";

export default function Table({ onUserSelect }) {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleClick = (user) => {
        // alert(JSON.stringify(user, null, 2));
        setSelectedRow(user.id);
        onUserSelect(user);
    };

    return (
        <div className="">
            <div className="font-inter text-xs overflow-x-auto">
                <div className="rounded-t-xl border border-slate-100">
                    <div className="">
                        <table className="table-fixed">
                            <thead className="">
                                <tr className="bg-slate-200 whitespace-nowrap">
                                    <th className="font-semibold py-3 px-6 text-left sticky left-0 bg-slate-200">
                                        USUARIO
                                    </th>
                                    <th className="font-semibold py-3 px-6 text-left">
                                        ROL
                                    </th>
                                    <th className="font-semibold py-3 px-6 text-left">
                                        EMAIL
                                    </th>
                                    <th className="font-semibold py-3 px-6 text-left">
                                        ORGANIZACION
                                    </th>
                                    <th className="font-semibold py-3 px-6 text-left">
                                        ESTADO
                                    </th>
                                    <th className="font-semibold py-3 px-6 text-left">
                                        ULTIMA CONEXION
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300">
                                {users.map((user) => (
                                    <tr
                                        className={`${user.id === selectedRow ? "relative bg-slate-200 transition-all duration-200" : ""}`}
                                        key={user.id}
                                        onClick={() => handleClick(user)}
                                    >
                                        <td
                                            className={`whitespace-nowrap font-medium px-6 py-3 sticky left-0 ${user.id === selectedRow ? "bg-slate-200 transition-all duration-200" : "bg-white"}`}
                                        >
                                            {user.username}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-3">
                                            {user.role}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-3">
                                            {user.email}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-3">
                                            {user.organization}
                                        </td>
                                        <td
                                            className={
                                                user.is_logged
                                                    ? "px-6 py-3 font-semibold text-green-600"
                                                    : "px-6 py-3 font-semibold text-slate-500"
                                            }
                                        >
                                            {user.is_logged
                                                ? "Activo"
                                                : "Inactivo"}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-3">
                                            {user.last_connection
                                                ? new Date(
                                                      user.last_connection,
                                                  ).toLocaleString("es-ES", {
                                                      hour12: false,
                                                  })
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
