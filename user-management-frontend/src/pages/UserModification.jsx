import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import userUpdateRequest from "./Users/userUpdateRequest";
import { validateUserModicationForm } from "./Users/validateUserModicationForm";

export default function UserModification() {
    // let allowPutRequest = true;
    const [allowPutRequest, setAllowPutRequest] = useState(false);

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

    useEffect(() => {
        if (allowPutRequest) {
            userUpdateRequest(formInput, setSuccessResponse, setFailureResonse);
            setAllowPutRequest(false);
        }
    }, [allowPutRequest, formError]);

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
            setAllowPutRequest(false);
            // allowPutRequest = false;
        }
        if (!formInput.password) {
            errors.push("Password should not be empty");
            setAllowPutRequest(false);
            // allowPutRequest = false;
        }
        if (!formInput.confirmPassword) {
            errors.push("Confirm Password should not be empty");
            setAllowPutRequest(false);
            // allowPutRequest = false;
        }
        if (formInput.confirmPassword !== formInput.password) {
            errors.push("Password and confirm password should be the same");
            setAllowPutRequest(false);
            // allowPutRequest = false;
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
            if (errors.length === 0) {
                setAllowPutRequest(true);
            } else {
                setAllowPutRequest(false);
            }
        }

        console.log("errors:", errors);
        console.log("formerror:", formError);

        console.log(allowPutRequest);
    };

    return (
        <div className="font-inter flex justify-center">
            <form className="w-[400px]" onSubmit={validateUserModicationForm}>
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
                        className={`flex space-x-2 transition-opacity duration-200 items-center pl-4 text-sm h-10 rounded font-medium ${failureResponse ? "opacity-100 bg-red-100 text-red-600" : "opacity-0"} ${successResponse ? "opacity-100 bg-green-100 text-green-700" : "opacity-0"}`}
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
