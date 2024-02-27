export const validateUserModicationForm = (
    formInput,
    setFormError,
    setAllowPutRequest,
) => {
    let inputError = {
        username: "",
        password: "",
        confirmPassword: "",
    };

    let errors = [];

    if (!formInput.username) {
        errors.push("Enter valid username");
        setAllowPutRequest(false);
    }

    if (!formInput.password) {
        errors.push("Password should not be empty");
        setAllowPutRequest(false);
    }

    if (!formInput.confirmPassword) {
        errors.push("Confirm Password should not be empty");
        setAllowPutRequest(false);
    }

    if (formInput.confirmPassword !== formInput.password) {
        errors.push("Password and confirm password should be the same");
        setAllowPutRequest(false);
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
};
