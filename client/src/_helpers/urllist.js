const backEndURL =
    process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_DBPRODURL
        : process.env.VUE_APP_DBDEVURL;
const baseURL = backEndURL + "/api/v1/database/";
let acc = localStorage.getItem("useraccount");
class urllist {
    static getBackEndURL() {
        return backEndURL;
    }
    static getSoldesUrl() {
        return baseURL + "soldes";
    }
    static updateSoldesUrl(id) {
        return baseURL + "soldes/" + id;
    }
    static getCongesUrl() {
        return baseURL + "conges";
    }
    static getAddCongesUrl() {
        return baseURL + "conges/add";
    }
    static getEditDelCongesUrl(id) {
        return baseURL + "conges/" + id;
    }
    static getLoginUrl() {
        return baseURL + "account";
    }
    static getAddAccUrl() {
        return baseURL + "account/add";
    }
    static getEditDelAccUrl(id) {
        return baseURL + "account/" + id;
    }
    static getDcsUrl() {
        if(acc==null)
        {
            acc = localStorage.getItem("useraccount");
        }
        if (acc == "admin") { return baseURL + "dc"; }
        else {
            return baseURL + "dcByManager/" + parseInt(localStorage.getItem("manager_id"));
        }
    }
    static getDcUrl(id) {
        if(acc==null)
        {
            acc = localStorage.getItem("useraccount");
        }
        if (acc == "user" || acc == "admin")
            return baseURL + "dc/" + id;
        else
            return baseURL + "dc/candidat/" + id;
    }
    static getDcDocUrl(id) {
        return baseURL + "dc/doc/" + id;
    }
    static getDcAdminUrl(id) {
        return baseURL + "dcAdmin/" + id;
    }
    static getAddDcUrl() {
        return baseURL + "dc/add";
    }
    static getDelDcUrl(id) {
        return baseURL + "dc/" + id;
    }
    /*static update(id, data, isCompleted) {
        return baseurl.put(`/dc/${id}?completed=${isCompleted}`, data);
    }

    static searchByName(name) {
        return baseurl.get(`/dc?name=${name}`);
    }

    static searchByTag(tag) {
        return baseurl.get(`/dc?tag=${tag}`);
    }*/
}

export default urllist;
