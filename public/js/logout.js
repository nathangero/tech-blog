async function logoutUser() {
    console.log("@logoutUser")
    try {
        const response = await fetch("/api/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/");
        }
    } catch (error) {
        alert("Couldn't logout for some reason");
        console.error(error);
    }
}

document.getElementById("button-logout").addEventListener("click", logoutUser);