// Button Status: xử lí tính năng lọc khi muốn có trạng thái nào đó sẽ set lại url tương ứng 
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status) {
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    })
}


// Form search: xử lí tính năng lọc khi search một cái gì đó vào form input thì sẽ có thêm url tương ứng 
const  formSearch = document.querySelector("#form-search");

if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.prevenDefault();
        const keyword = e.targer.elements.keyword.value;

        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

// Xử lí tính năng để click vào từng trang nó sẽ thay đổi url với trang tương ứng đó, điều hướng trang web theo trang tương ứng

const buttonsPagination = document.querySelectorAll("[button-pagination]")
if(buttonsPagination){
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });

    });
}

// xử lí checkbox multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {

    // logic cho checkall
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        }
        else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }
        });
    })
    // end

}
// end xử lí checkbox multi

// Xử lí cho form change multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có muốn xóa những sản phẩm này không?");
            if(!isConfirm){
                return;
            }
        }

        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                    console.log(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng tick vào ít nhất một cái!");
        }
        
    });
}
// End cho form change multi


// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(()  => {
        showAlert.classList.add("alert-hidden");
    }, time)

    closeAlert.addEventListener("click", ()=> {
        showAlert.classList.add("alert-hidden");
    });
}
// End Show Alert


// Upload Images
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const buttonCloseImage = document.querySelector("[button-close-image]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });

    buttonCloseImage.addEventListener("click", () => {
        console.log("TAO DONG DAY");
        uploadImagePreview.src = "";
        uploadImageInput.value = "";
    });
}
// End Upload Images

