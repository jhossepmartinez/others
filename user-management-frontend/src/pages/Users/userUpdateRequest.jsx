export default async function userUpdateRequest(
    formInput,
    setSuccessResponse,
    setFailureResonse,
) {
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
            setSuccessResponse(`Succesfully updated ${formInput.username} `);
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
