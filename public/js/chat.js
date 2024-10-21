import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

const simplePreviewTemplate = `
    <div class="dz-preview dz-file-preview">
        <div class="dz-image">
            <img data-dz-thumbnail />
        </div>
        <div class="dz-details">
            <div class="dz-filename"><span data-dz-name></span></div>
        </div>
    </div>
`;

Dropzone.autoDiscover = false;

const dropzone = new Dropzone(".my-dropzone", {
    url: "/chat/upload",
    paramName: "file",
    maxFilesize: 2,
    acceptedFiles: "image/*",
    uploadMultiple: false,
    autoProcessQueue: false,
    addRemoveLinks: true, 
    init: function () {
        this.on("addedfile", function (file) {
            // Ẩn icon khi file được thêm vào
            const uploadIcon = document.getElementById("upload-icon");
            if (uploadIcon) {
                uploadIcon.style.display = "none";
            }

            // Convert the file to a buffer
            const reader = new FileReader();
            reader.onloadend = function () {
                file.buffer = reader.result;
            };
            reader.readAsArrayBuffer(file);
        });

        this.on("removedfile", function () {
            const uploadIcon = document.getElementById("upload-icon");
            if (uploadIcon) {
                uploadIcon.style.display = "block";
            }
        });
    }
});

// CLIENT_SEND_MESSAGE còn phải xử lí chỗ này
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData) {

    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const files = dropzone.files; // Get the uploaded files

        console.log(files);

        let imageBuffer = null;
        if (files.length > 0 && files[0].buffer) {
            imageBuffer = files[0].buffer;  // Use the buffer of the first file
        }
        if(content || imageBuffer){
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                imageBuffer: imageBuffer 
            });
                    
            e.target.elements.content.value = ""; 
            dropzone.removeAllFiles(true); 

            const uploadIcon = document.getElementById("upload-icon");
            if (uploadIcon) {
                uploadIcon.style.display = "block";
            }
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }

    });
}
// END CLIENT_SEND_MESSAGE

// Hàm gửi tin nhắn

function sendMessage(content, imageUrl = null) {
    if (content || imageUrl) {
        const messageData = {
            content: content || "",
            imageUrl: imageUrl || "" // URL của ảnh (nếu có)
        };
        socket.emit("CLIENT_SEND_MESSAGE", messageData);

        // Reset form sau khi gửi
        document.querySelector(".chat .inner-form input[name='content']").value = "";
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
}

// End Hàm gửi tin nhắn

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

    let htmlContent = "";
    if(data.content) {
        htmlContent = `<div class="inner-content"> ${data.content}</div>`
    }
    let htmlImage = '';
    if(data.images.length > 0 && data.images) {
        htmlImage = `<div class="inner-image">
                    <img src="${data.images}" alt="image" class="chat-image"">
                </div>`;
    }

    div.innerHTML = `
        ${htmlFullname}
        ${htmlContent}
        ${htmlImage}
    `  

    body.insertBefore(div, boxTyping);
    
    // body.scrollTop = body.scrollHeight;
    const imageElement = div.querySelector(".chat-image");
    if (imageElement) {
        imageElement.onload = () => {
            body.scrollTop = body.scrollHeight;  // Tự động cuộn xuống dưới cùng sau khi ảnh tải xong
        };
    } else {
        body.scrollTop = body.scrollHeight;  // Nếu không có ảnh, cuộn xuống ngay
    }

    // Nếu không có ảnh, cuộn ngay lập tức
    if (!data.images) {
        body.scrollTop = body.scrollHeight;  // Tự động cuộn xuống dưới cùng khi không có ảnh
    }
    body.scrollTop = body.scrollHeight;

    const gallery = new Viewer(div);
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
        const myId = document.querySelector("[my-id]").getAttribute("my-id");
    
        // Chỉ xử lý nếu người đang gõ tin là người khác, không phải người hiện tại
        if(data.userId !== myId) {
            if(data.type == "show") {
                const bodyChat = document.querySelector(".chat .inner-body");
                const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
                
                // Nếu không có boxTyping cho người dùng này thì thêm mới
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
            } else { 
                // Ẩn boxTyping khi người dùng ngừng gõ
                const existTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
                if (existTypingRemove) {
                    elementListTyping.removeChild(existTypingRemove);
                }
            }
        }
    });
    
}
// END SERVER_RETURN_TYPING

// Preview Full Image

const bodyChatPreviewFullImage = document.querySelector(".chat .inner-body");
if(bodyChatPreviewFullImage) {
    const gallery = new Viewer(bodyChatPreviewFullImage);
}

// End Preview Full Image
