const initial_likes = 100;
const initial_dislikes = 20;
let likes = initial_likes;
let dislikes = initial_dislikes;
let comments = [];

const like_btn = document.getElementById("like-btn");
const dislike_btn = document.getElementById("dislike-btn");

const like_count = document.getElementById("like-count");
const dislike_count = document.getElementById("dislike-count");

const comment_input = document.getElementById("comment-input");
const submit_btn = document.getElementById("submit-btn");
const reset_btn = document.getElementById("reset-btn");

const comments_section = document.getElementById("comments-section");

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; max-age=" + 7 * 24 * 60 * 60 + "; path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }

        let cookie_name = name + "=";
        if (cookie.indexOf(cookie_name) === 0) {
            return cookie.substring(
                cookie_name.length,
                cookie.length
            );
        }
    }
    return "";
}

function deleteCookie(name) {

    document.cookie = name +"=; expires=" + new Date(2004, 1, 1).toUTCString() + "; path=/";
}

function updateCounters() {
    like_count.innerText = likes;
    dislike_count.innerText = dislikes;
}

function disableVoteButtons() {
    like_btn.disabled = true;
    dislike_btn.disabled = true;
}

function enableVoteButtons() {
    like_btn.disabled = false;
    dislike_btn.disabled = false;
}

function displayComments() {
    comments_section.innerHTML = "";
    comments.forEach(function(comment) {
        let paragraph = document.createElement("p");
        paragraph.className = "comment";
        paragraph.innerText = comment;
        comments_section.appendChild(paragraph);
    });
}

function handleLike() {
    let user_choice = getCookie("lab6_vote");
    if (user_choice !== "") {
        return;
    }
    likes++;
    updateCounters();

    setCookie("lab6_likes", likes);
    setCookie("lab6_dislikes", dislikes);
    setCookie("lab6_vote", "like");
    disableVoteButtons();
}
function handleDislike() {
    let user_choice = getCookie("lab6_vote");
    if (user_choice !== "") {
        return;
    }
    dislikes++;
    updateCounters();
    setCookie("lab6_likes", likes);
    setCookie("lab6_dislikes", dislikes);
    setCookie("lab6_vote", "dislike");

    disableVoteButtons();
}
function submitComment() {
    let old_comment = getCookie("lab6_comment");
    if (old_comment !== "") {
        return;
    }
    let comment = comment_input.value;
    if (comment.length === 0) {
        return;
    }
    comments.push(comment);
    let safe_comment = comment.split(";").join(",");
    setCookie("lab6_comment", safe_comment);
    displayComments();
    comment_input.value = ""
    comment_input.disabled = true;
    submit_btn.disabled = true;
}
function resetAll() {
    deleteCookie("lab6_vote");
    deleteCookie("lab6_likes");
    deleteCookie("lab6_dislikes");
    deleteCookie("lab6_comment");
    likes = initial_likes;
    dislikes = initial_dislikes;
    comments = [];

    updateCounters();
    displayComments();
    enableVoteButtons();
    comment_input.disabled = false;
    submit_btn.disabled = false;
    comment_input.value = "";
}

function loadSavedState() {
    let saved_likes = getCookie("lab6_likes");
    let saved_dislikes = getCookie("lab6_dislikes");
    let saved_vote = getCookie("lab6_vote");
    let saved_comment = getCookie("lab6_comment");


    if (saved_likes !== "") {
        likes = parseInt(saved_likes);
    }

    if (saved_dislikes !== "") {
        dislikes = parseInt(saved_dislikes);
    }

    if (saved_vote !== "") {
        disableVoteButtons();
    }

    if (saved_comment !== "") {
        comments.push(saved_comment);
        comment_input.disabled = true;
        submit_btn.disabled = true;
    }
    updateCounters();
    displayComments();
}

like_btn.addEventListener("click", handleLike);
dislike_btn.addEventListener("click", handleDislike);
submit_btn.addEventListener("click", submitComment);
reset_btn.addEventListener("click", resetAll);
loadSavedState();