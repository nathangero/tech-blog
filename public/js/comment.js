import { setupIdleTimer } from "./idle-timer.js";

setupIdleTimer();

async function toggleAddComment(event, addComment) {
    // event.preventDefault();
    event.stopPropagation();

    // Show/hide the new comment form
    document.getElementById("form-comment").style.display = addComment ? "flex" : "none";
    document.getElementById("button-make-comment").style.display = addComment ? "none" : "flex";

    // Scroll to the form to make it easier for the user
    if (addComment) {
        document.getElementById("form-comment").scrollIntoView();
    }
}


async function addComment(event) {
    event.preventDefault();
    event.stopPropagation();

    const content = document.querySelector("#comment-content").value.trim();

    if (!content) {
        alert("Please fill out all fields");
        return;
    }

    const newComment = {
        content: content
    }

    // Get post id from address bar
    let postId = window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
    ]

    try {
        const response = await fetch(`/api/posts/addComment/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        });

        if (response.ok) {
            // Reload the page to show the updated info
            document.location.reload();
        } else {
            alert("Couldn't add comment");
        }
    } catch (error) {
        alert("Couldn't add comment");
    }
}

document.querySelector("#button-make-comment").addEventListener("click", (event) => toggleAddComment(event, true));
document.querySelector("#button-cancel-comment").addEventListener("click", (event) => toggleAddComment(event, false));
document.querySelector("#button-add-comment").addEventListener("click", addComment);


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