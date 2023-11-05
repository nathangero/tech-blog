async function toggleAddComment(event, addComment) {
    event.preventDefault();
    event.stopPropagation();

    // Show/hide the new comment form
    document.getElementById("form-comment").style.visibility = addComment ? "visible" : "hidden";
    document.getElementById("button-make-comment").style.visibility = addComment ? "hidden" : "visible";
}


async function addComment(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("@addComment");
}


document.querySelector("#button-make-comment").addEventListener("click", (event) => toggleAddComment(event, true));
document.querySelector("#button-cancel-comment").addEventListener("click", (event) => toggleAddComment(event, false));
document.querySelector("#button-add-comment").addEventListener("click", addComment);

console.log("HELLO FROM COMMENT.JS")