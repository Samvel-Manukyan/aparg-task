const requestQuery = (object) => {
    let query = "";
    for (let key in object) {
        query += key + "=" + object[key] + "&";
    }

    return "?" + query.substring(0, query.length - 1);
};

export default requestQuery;
