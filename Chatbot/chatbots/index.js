var container = document.querySelector(".container");
var stackWrap = document.querySelector(".stack-wrap");
var contacts = document.querySelector(".contacts");
var messages = document.querySelector(".messages");
var reply = document.getElementById("reply");
var small, limiter;

let user = "hello";

reply.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("submit").click();
    }
});

function botReply(message) {
    message_container.innerHTML += `<div class=”bot”>${message}</div>`;
}

function selfReply() {
    message = document.getElementById("reply").value;
    message_container.innerHTML += `<div class=”self”>${message}</div>`;
    getReply(user, message);
    botReply(reply);
}

//Layout source : https://codepen.io/rileyjshaw/pen/LExqQE

function relayout() {
    var width = window.innerWidth;
    if (!small && width < 600) {
        small = true;
        container.classList.add("small-screen");
        stackWrap.appendChild(contacts);
        stackWrap.appendChild(messages);
    } else if (small && width >= 600) {
        small = false;
        container.classList.remove("small-screen");
        container.insertBefore(contacts, stackWrap);
        container.insertBefore(messages, stackWrap);
    }
}

window.addEventListener("resize", function () {
    clearTimeout(limiter);
    limiter = setTimeout(relayout, 100);
});

relayout();
