module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class:""
        },
        {
            name: "Dừng hoạt động",
            status: "unactive",
            class: ""
        }

    ];

    if(query.status){
        const indexx = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[indexx].class = "active";
    }
    else {
        const indexx = filterStatus.findIndex(item => item.status == "");
        filterStatus[indexx].class = "active";
    }

    return filterStatus;
};