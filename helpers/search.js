module.exports = (query) => {
    const objectSearch = {
        keyword: "",
        regex: ""
    }
    let keyword = "";
    if(query.keyword){
        objectSearch.keyword = query.keyword;

        const regex = new RegExp(objectSearch.keyword,"i");
        objectSearch.regex = regex;
    }

    return objectSearch;
};