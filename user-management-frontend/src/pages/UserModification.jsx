import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function UserModification() {
    let allowPutRequest = false;

    const [successResponse, setSuccessResponse] = useState("");
    const [failureResponse, setFailureResonse] = useState("");
    const [formInput, setFormInput] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const validateFormInput = (event) => {
        event.preventDefault();
        let inputError = {
            username: "",
            password: "",
            confirmPassword: "",
        };

        let errors = [];

        if (!formInput.username) {
            errors.push("Enter valid username");
        }
        if (!formInput.password) {
            errors.push("Password should not be empty");
        }
        if (!formInput.confirmPassword) {
            errors.push("Confirm Password should not be empty");
        }
        if (formInput.confirmPassword !== formInput.password) {
            errors.push("Password and confirm password should be the same");
        }

        if (errors.length >= 0) {
            setFormError({
                ...inputError,
                username: errors.includes("Enter valid username")
                    ? "Enter valid username"
                    : "",

                password: errors.includes("Password should not be empty")
                    ? "Password should not be empty"
                    : errors.includes(
                            "Password and confirm password should be the same",
                        )
                      ? "Password and confirm password should be the same"
                      : "",
                confirmPassword: errors.includes(
                    "Confirm Password should not be empty",
                )
                    ? "Confirm Password should not be empty"
                    : errors.includes(
                            "Password and confirm password should be the same",
                        )
                      ? "Password and confirm password should be the same"
                      : "",
            });
        }

        console.log(errors);
        console.log(formError);

        async function updateUser() {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formInput.username,
                    password: formInput.password,
                }),
            };

            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${formInput.username}/`,
                    requestOptions,
                );
                const data = await response.json();
                if (response.ok) {
                    console.log("Successfull PUT request", data);
                    setFailureResonse("");
                    setSuccessResponse(
                        `Succesfully updated ${formInput.username} `,
                    );
                    setTimeout(() => {
                        setSuccessResponse("");
                    }, 2000);
                } else if (response.status === 404) {
                    setSuccessResponse("");
                    setFailureResonse(`User ${formInput.username} not found!`);
                    setTimeout(() => {
                        setFailureResonse("");
                    }, 2000);
                }
            } catch (error) {
                console.error(error);
                setSuccessResponse("");
                setFailureResonse("Server is down");
                setTimeout(() => {
                    setFailureResonse("");
                }, 2000);
            }
        }

        if (allowPutRequest) {
            updateUser();
        }
    };

    return (
        <div className="font-inter flex justify-center ">
            <form className="w-[400px]" onSubmit={validateFormInput}>
                <div className="space-y-3 w-full">
                    <div className="flex flex-col h-20 space-y-1">
                        <div className="space-y-1 w-full">
                            <p className="font-semibold text-slate-800 text-sm">
                                Username
                            </p>
                            <input
                                type="text"
                                name="username"
                                value={formInput.username}
                                placeholder="Username"
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value);
                                }}
                                className={`${formError.username ? "border-red-500" : ""} border text-sm w-full transition duration-300 focus:border-slate-600 focus:shadow-lg focus:outline-none text-slate-800 border-slate-400 shadow-b placeholder-slate-900 px-2 py-2`}
                            />
                        </div>
                        <p className="error-message text-red-600 text-sm font-medium">
                            {formError.username}
                        </p>
                    </div>
                    <div className="flex flex-col h-20 space-y-1">
                        <div className="space-y-1 w-full">
                            <p className="font-semibold text-slate-800 text-sm">
                                Password
                            </p>
                            <input
                                type="text"
                                name="password"
                                value={formInput.password}
                                placeholder="Password"
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value);
                                }}
                                className={`${formError.password ? "border-red-500" : ""} border text-sm w-full transition duration-300 focus:border-slate-600 focus:shadow-lg focus:outline-none text-slate-800 border-slate-400 shadow-b placeholder-slate-900 px-2 py-2`}
                            />
                        </div>
                        <p className="error-message text-red-600 text-sm font-medium">
                            {formError.password}
                        </p>
                    </div>
                    <div className="flex flex-col h-20 space-y-1">
                        <div className="space-y-1 w-full">
                            <p className="font-semibold text-slate-800 text-sm">
                                Confirm Password
                            </p>
                            <input
                                type="text"
                                name="confirmPassword"
                                value={formInput.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value);
                                }}
                                className={`${formError.confirmPassword ? "border-red-500" : ""} border text-sm w-full transition duration-300 focus:border-slate-600 focus:shadow-lg focus:outline-none text-slate-800 border-slate-400 shadow-b placeholder-slate-900 px-2 py-2`}
                            />
                        </div>
                        <p className="error-message text-red-600 text-sm font-medium">
                            {formError.confirmPassword
                                ? formError.confirmPassword
                                : ""}
                        </p>
                    </div>
                    <div
                        className={`flex space-x-2 transition-opacity duration-200 items-center pl-4 text-sm h-10 rounded font-medium ${failureResponse ? "opacity-100 bg-red-200 text-red-600" : "opacity-0"} ${successResponse ? "opacity-100 bg-green-200 text-green-700" : "opacity-0"}`}
                    >
                        <FaCheckCircle
                            color={
                                successResponse
                                    ? "#15803d"
                                    : failureResponse
                                      ? "#dc2626"
                                      : "White"
                            }
                        />
                        <div>
                            {successResponse} {failureResponse}
                        </div>
                    </div>
                    <div className="flex pt-4">
                        <div className="w-full flex justify-end">
                            <input
                                type="submit"
                                value="Sign Up"
                                className="bg-black hover:bg-sky-500 cursor-pointer text-white px-20 rounded-full py-2"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
