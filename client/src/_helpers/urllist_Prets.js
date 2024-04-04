const backEndURL =
    process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_DBPRODURL
        : process.env.VUE_APP_DBDEVURL;
const baseURL = backEndURL + "/api/v1/database/";
class urllist_Prets {
    static getPretsUrl() {
        return baseURL + "prets";
    }
    static getPretByIdUrl(id) {
        return baseURL + "pret/" + id;
    }
    static getaddPretUrl() {
        return baseURL + "pret/add";
    }
    static getupdatePretUrl(id) {
        return baseURL + "pret/" + id;
    }
    static getdeletePretByIdUrl(id) {
        return baseURL + "pret/" + id;
    }
    static getAllPersonUrl() {
        return baseURL + "person";
    }  
    static getAllBankUrl() {
        return baseURL + "banks";
    }  
}

export default urllist_Prets;
