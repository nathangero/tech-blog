async function loginUser(event) {
    event.preventDefault();
    event.stopPropagation();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        alert("Fill out both username and password");
        return;
    }

    const login = {
        username: username,
        password: password
    }

    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        });

        if (response.ok) {
            // If user is loggeed in then send them back to the homepage
            document.location.replace("/");
        } else {
            alert("Invalid username and/or password");
        }
    } catch (error) {
        console.error(error);
    }
}

document.querySelector("#form-login").addEventListener("submit", loginUser);
