console.log("OK");
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
        }
    });
}
// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");

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

    body.appendChild(div);
    
    bodyChat.scrollTop = bodyChat.scrollHeight;
});

// END SERVER_RETURN_MESSAGE

// SCROLL TO BOTTOM

const bodyChat = document.querySelector(".chat .inner-body");

if(bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;

}

// END SCROLL TO BOTTOM