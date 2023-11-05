async function loginUser(event) {
    event.preventDefault();
    event.stopPropagation();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        alert("Fill out both email and password");
        return;
    }

    const login = {
        email: email,
        password: password
    }

    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        })
        console.log("response:", response);
        if (response.ok) {
            // If user is loggeed in then send them back to the homepage
            console.log("Logged in!");
            document.location.replace("/");
        } else {
            alert("Invalid email and/or password");
        }
    } catch (error) {
        console.error(error);
    }
}

document.querySelector("#form-login").addEventListener("submit", loginUser);
