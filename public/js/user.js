
// Chức năng gửi yêu cầu kết bạn

const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("btn-add-friend");
            // lấy ra thẻ cha để add thêm class add để khi click vào button Kết bạn thì sẽ hiện ra nút Hủy
            button.closest(".box-user").classList.add("add");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    })
}

// End Chức năng gửi yêu cầu kết bạn