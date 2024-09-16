import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        console.log(content);
        if(content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = ""; 
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    const boxTyping = document.querySelector(".chat .inner-list-typing");

    let htmlFullname = "";

    if(myId == data.userId) {
        div.classList.add("inner-outgoing");
    }
    else {
        div.classList.add("inner-incoming");
        htmlFullname = `<div class="inner-name"> ${data.fullName}</div>`;
    }

    div.innerHTML = `
        ${htmlFullname}
        <div class="inner-content"> ${data.content}</div>
    `

    body.insertBefore(div, boxTyping);
    
    bodyChat.scrollTop = bodyChat.scrollHeight;
});

// END SERVER_RETURN_MESSAGE

// SCROLL TO BOTTOM

const bodyChat = document.querySelector(".chat .inner-body");

if(bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;

}

// END SCROLL TO BOTTOM

// Show icon chat
    // Show popup emoji------
const buttonIcon = document.querySelector('.button-icon');
if(buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip)

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
    // End Show popup emoji-----

    // Insert Icon to Input------ 
var timeOut;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 2000);
}
const emojiPicker = document.querySelector("emoji-picker");

if(emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener('emoji-click', (event) => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + " " + icon;

        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();


        showTyping();
    });

    // Input Keyup
    var timeOut;
    inputChat.addEventListener('keyup', () => {
        showTyping();
    });
    // End Input Keyup
}
    // End Insert Icon to Input -------
// End Show icon chat


// SERVER_RETURN_TYPING

const elementListTyping = document.querySelector(".chat .inner-list-typing");
if(elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        console.log(data);
        if(data.type == "show") {
            const bodyChat = document.querySelector(".chat .inner-body");
            const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            if(!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);

                boxTyping.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;

                elementListTyping.appendChild(boxTyping);
                if(bodyChat) {
                    bodyChat.scrollTop = bodyChat.scrollHeight;
                
                }
            }
        }
        else { 
            const existTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            elementListTyping.removeChild(existTypingRemove);
        }
    });
}
// END SERVER_RETURN_TYPING
