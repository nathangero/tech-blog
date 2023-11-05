function toggleNewPost(event, makeNewPost) {
    event.preventDefault();
    event.stopPropagation();

    // Show the new post form
    document.getElementById("form-post").style.visibility = makeNewPost ? "visible" : "hidden";
    document.getElementById("button-make-post").style.visibility = makeNewPost ? "hidden" : "visible";
}

async function addNewPost(event) {
    event.preventDefault();
    event.stopPropagation();

    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();

    if (!title || !content) {
        alert("Please fill out all fields");
        return;
    }

    const newPost = {
        title: title,
        content: content
    }

    try {
        const response = await fetch("/api/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });

        if (response.ok) {
            // If user is loggeed in then send them back to the homepage
            console.log("Logged in!");
            document.location.replace("/dashboard");
        } else {
            alert("Invalid email and/or password");
        }
    } catch (error) {
        alert("Couldn't add new post");
    }
}

document.querySelector("#button-make-post").addEventListener("click", (event) => toggleNewPost(event, true));
document.querySelector("#button-cancel-post").addEventListener("click", (event) => toggleNewPost(event, false));
document.querySelector("#button-add-post").addEventListener("click", addNewPost);