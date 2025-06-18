
// Chức năng gửi yêu cầu kết bạn

const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {

            // lấy ra thẻ cha để add thêm class add để khi click vào button Kết bạn thì sẽ hiện ra nút Hủy
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);

            boxUser.classList.add("add");
            button.innerText = "Hủy kết bạn";
            button.removeAttribute("btn-add-friend");
            button.setAttribute("btn-cancel-friend", userId);
        });
    })
}

// End Chức năng gửi yêu cầu kết bạn

// Chức năng hủy yêu cầu kết bạn: A gửi yêu cầu kb với B xong rồi k thích nữa thì hủy

const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");

            socket.emit("CLIENT_CANCEL_FRIEND", userId);

            boxUser.classList.remove("add");
            button.innerText = "Kết bạn";
            button.removeAttribute("btn-cancel-friend");
            button.setAttribute("btn-add-friend", userId);
        });
    })
}

// End Chức năng hủy yêu cầu kết bạn

// Chức năng từ chối kết bạn: ví dụ A kb với B, B k thích nên hủy kb

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            // lấy ra thẻ cha để add thêm class add để khi click vào button Kết bạn thì sẽ hiện ra nút Hủy
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        });
    })
}

// End Chức năng từ chối kết bạn

// Chức năng chấp nhận kết bạn

const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            // lấy ra thẻ cha để add thêm class add để khi click vào button Kết bạn thì sẽ hiện ra nút Hủy
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        });
    })
}

// End Chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIENDS
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if(badgeUsersAccept) {
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIENDS", (data) => {
        console.log(data.userId);
        const userId = badgeUsersAccept.getAttribute("[badge-users-accept]");
        console.log(userId);
        if(data.userId === userId) {
            badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
        }
    })
}
// END SERVER_RETURN_LENGTH_ACCEPT_FRIENDS