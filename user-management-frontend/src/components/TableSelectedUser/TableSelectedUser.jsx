import React from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import permisos from "./permisos.json";

export default function TableSelectedUser({ user }) {
    if (!user) {
        return;
    }

    const {
        id,
        username,
        email,
        role,
        organization,
        is_logged,
        last_connection,
        acceso_grupos,
        acceso_paquetes,
        acceso_vuelos,
    } = user;

    const permisos_usuario = permisos.find((permiso) => permiso.user_id === id);
    // console.log(permisos_usuario);

    if (!permisos_usuario) {
        return null;
    }

    const {
        grupos,
        coporativo,
        "viajes y turismo": viajesYT,
        "clientes operadores": clientesOperadores,
        finanzas,
        administracion,
        interfaz,
        negocios,
        estadistica,
        servicios,
        configuracion,
        vendedores,
        "banco de datos": bancoDeDatos,
        "emision de documentos": emisionDeDocumentos,
    } = permisos_usuario;

    return (
        <div className="py-3 px-4 space-y-6 rounded-b-xl border border-slate-200 text-sm">
            <div className="flex space-x-3 text-slate-500 md:text-lg">
                <div className="font-semibold whitespace-nowrap">
                    Detalles de usuario:
                </div>
                <div className="font-semibold">{username}</div>
            </div>
            <div className="space-y-3">
                <div className="font-semibold text-md md:text-lg">
                    Lista de Permisos:
                </div>
                <div className="space-y-2 md:text-lg">
                    <div className="space-y-2 grid grid-cols-2 md:grid md:grid-cols-3">
                        {Object.entries(permisos_usuario).map(
                            ([key, value]) =>
                                key !== "id" &&
                                key != "user_id" && (
                                    <div
                                        key={key}
                                        className="flex space-x-2 items-center"
                                    >
                                        <div>
                                            {value ? (
                                                <MdCheckBox
                                                    size={20}
                                                    color="#0284c7"
                                                />
                                            ) : (
                                                <MdCheckBoxOutlineBlank
                                                    size={20}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}{" "}
                                        </div>
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
