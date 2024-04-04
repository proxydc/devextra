const backEndURL =
    process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_DBPRODURL
        : process.env.VUE_APP_DBDEVURL;
const baseURL = backEndURL + "/api/v1/database/";
class urllist_Sgbs {
    static getSgbsUrl() {
        return baseURL + "sgbs";
    }
    static getSgbsIntUrl() {
        return baseURL + "sgbsInt";
    }
    static getSgbByIdUrl(id) {
        return baseURL + "sgb/" + id;
    }
    static getaddSgbUrl() {
        return baseURL + "sgb/add";
    }
    static getupdateSgbUrl(id) {
        return baseURL + "sgb/" + id;
    }
    static getdeleteSgbByIdUrl(id) {
        return baseURL + "sgb/" + id;
    }
    static getAllPersonUrl() {
        return baseURL + "person";
    } 
    static getAllBanksUrl() {
        return baseURL + "banks";
    }   
}

export default urllist_Sgbs;
