function toggleEditPost(event, updatePost) {
    event.preventDefault();
    event.stopPropagation();
    console.log("@toggleEditPost")
    // Show the new post form
    document.getElementById("form-update-post").style.visibility = updatePost ? "visible" : "hidden";
    document.getElementById("button-update-post").style.visibility = updatePost ? "hidden" : "visible";
    document.getElementById("button-delete-post").style.visibility = updatePost ? "hidden" : "visible";
}

async function updatePost(event) {
    event.preventDefault();
    event.stopPropagation();

    const title = document.querySelector("#post-update-title").value.trim();
    const content = document.querySelector("#post-update-content").value.trim();

    if (!title || !content) {
        alert("Please fill out all fields");
        return;
    }

    const updatedPost = {
        title: title,
        content: content
    }
    
    // Get post id from address bar
    let postId = window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
    ]

    try {
        const response = await fetch(`/api/posts/update/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
        });

        if (response.ok) {
            // If user is loggeed in then send them back to the homepage
            document.location.replace("/dashboard");
        } else {
            alert("Couldn't update post");
        }
    } catch (error) {
        alert("Couldn't add new post");
    }
}


async function deletePost(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log("@deletePost");
}

document.querySelector("#button-update-post").addEventListener("click", (event) => toggleEditPost(event, true));
document.querySelector("#button-cancel-update").addEventListener("click", (event) => toggleEditPost(event, false));
document.querySelector("#button-confirm-update").addEventListener("click", updatePost);

document.querySelector("#button-delete-post").addEventListener("click", deletePost);