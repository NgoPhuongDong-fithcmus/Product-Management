// Permisions nhớ đọc kĩ lại cái này vì cái này bên front end xử lí nhiều nè
const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]")

    buttonSubmit.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input")

            if(name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id:id,
                        permissions: []
                    })
                });
            }
            else{
                inputs.forEach((input, index) => {
                    const checked = input.checked;

                    // console.log(name);
                    // console.log(index);
                    // console.log(checked);
                    // console.log("--------------------");
                    if(checked){
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });
        console.log(permissions);

        if(permissions.length > 0) {
            const formChangePermissions = document.querySelector("form-change-permissions")
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions'")
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    });
}
// End Permisions