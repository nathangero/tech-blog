import { setupIdleTimer } from "./idle-timer.js";

setupIdleTimer();

function toggleNewPost(event, makeNewPost) {
    // event.preventDefault();
    event.stopPropagation();

    // Show the new post form
    document.getElementById("form-post").style.display = makeNewPost ? "flex" : "none";
    document.getElementById("dashboard-posts").style.display = makeNewPost ? "none" : "flex";
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
            // Send the user back to the dashboard to see the added post
            document.location.replace("/dashboard");
        } else {
            alert("Couldn't add new post.");
        }
    } catch (error) {
        alert("Error from fetch. Couldn't add new post");
    }
}

document.querySelector("#button-make-post").addEventListener("click", (event) => toggleNewPost(event, true));
document.querySelector("#button-cancel-post").addEventListener("click", (event) => toggleNewPost(event, false));
document.querySelector("#button-add-post").addEventListener("click", addNewPost);

// Make event listeners to check if user is idle or not.
// Idle means not moving the mouse or typing. That way the page won't refresh while the user is doing something
document.addEventListener("mousemove", (e) => {
    // e.preventDefault();
    e.stopPropagation();
    
    // console.log("@update-post document body mouse move");
    setupIdleTimer();
})

document.addEventListener("keydown", (e) => {
    e.stopPropagation();

    // console.log("@update-post document body keydown");
    setupIdleTimer();
})