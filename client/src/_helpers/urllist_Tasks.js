const backEndURL =
    process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_DBPRODURL
        : process.env.VUE_APP_DBDEVURL;
const baseURL = backEndURL + "/api/v1/database/";
class urllist_Tasks {
    static getTasksUrl() {
        return baseURL + "tasks";
    }
    static getTaskByIdUrl(id) {
        return baseURL + "task/" + id;
    }
    static getaddTaskUrl() {
        return baseURL + "task/add";
    }
    static getupdateTaskUrl(id) {
        return baseURL + "task/" + id;
    }
    static getdeleteTaskByIdUrl(id) {
        return baseURL + "task/" + id;
    }
    static getAllPersonUrl() {
        return baseURL + "person";
    }  
}

export default urllist_Tasks;
