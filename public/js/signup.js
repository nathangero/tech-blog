async function signupUser(event) {
    event.preventDefault();
    event.stopPropagation();

    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!username || !email || !password) {
        alert("Fill out all fields");
        return;
    }

    const newUser = {
        username: username,
        email: email,
        password: password
    }

    try {
        const response = await fetch("/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })

        if (response.ok) {
            // If user is loggeed in then send them back to the homepage
            console.log("Signed up and logged in!");
            document.location.replace("/");
        } else {
            alert("Couldn't create new user");
        }
    } catch (error) {
        console.error(error);
    }
}

document.querySelector("#form-signup").addEventListener("submit", signupUser);