// Permisions nhớ đọc kĩ lại cái này vì cái này bên front end xử lí nhiều nè
const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]")

    buttonSubmit.addEventListener("click", () => {

        let permissionsParent = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input")

            if(name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissionsParent.push({
                        id: id,
                        permissions: []
                    });
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
                    permissionsParent[index].permissions.push(name);
                    }
                });
            }
        });

        if(permissionsParent.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions")
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']")
            inputPermissions.value = JSON.stringify(permissionsParent);
            formChangePermissions.submit();
        }
    });
}
// End Permisions


// Permissions Data: hiển thị những ô mình đã check
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));

    const tablePermissions = document.querySelector("[table-permissions]");

    records.forEach((record, index) => {
        const permissions = record.permissions;

        permissions.forEach((permission) => {
            console.log(permission);
            console.log(index);
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);

            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        });
    });
}
// End Permissions Data: hiển thị những ô mình đã check
