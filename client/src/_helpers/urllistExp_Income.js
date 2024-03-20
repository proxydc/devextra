const backEndURL =
    process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_DBPRODURL
        : process.env.VUE_APP_DBDEVURL;
const baseURL = backEndURL + "/api/v1/database/";
class urllistExp_Income {
    static getExpensesUrl() {
        return baseURL + "expenses";
    }
    static getExpensesByIdUrl(id) {
        return baseURL + "expenses/" + id;
    }
    static getaddExpensesUrl() {
        return baseURL + "expenses/add";
    }
    static getupdateExpensesUrl(id) {
        return baseURL + "expenses/" + id;
    }
    static getdeleteExpensesByIdUrl(id) {
        return baseURL + "expenses/" + id;
    }

    static getIncomesUrl() {
        return baseURL + "income";
    }
    static getIncomeByIdUrl(id) {
        return baseURL + "income/" + id;
    }
    static getaddIncomeUrl() {
        return baseURL + "income/add";
    }
    static getupdateIncomeUrl(id) {
        return baseURL + "income/" + id;
    }
    static getdeleteIncomeByIdUrl(id) {
        return baseURL + "income/" + id;
    }

    static getAllTypeExpensesUrl() {
        return baseURL + "type_expenses";
    }
    static getExpenseTypesByIdUrl(id) {
        return baseURL + "type_expenses/" + id;
    }
    static getaddExpenseTypesUrl() {
        return baseURL + "type_expenses/add";
    }
    static getdeleteExpenseTypesByIdUrl(id) {
        return baseURL + "type_expenses/" + id;
    }

    static getAllShopsUrl() {
        return baseURL + "shops";
    }
    static getShopByIdUrl(id) {
        return baseURL + "shops/" + id;
    }
    static getaddShopUrl() {
        return baseURL + "shops/add";
    }
    static getdeleteShopByIdUrl(id) {
        return baseURL + "shops/" + id;
    }

    static getAllPaymentTypesUrl() {
        return baseURL + "payment_types";
    }
    static getPaymentTypesByIdUrl(id) {
        return baseURL + "payment_types/" + id;
    }
    static getaddPaymentTypesUrl() {
        return baseURL + "payment_types/add";
    }
    static getdeletePaymentTypesByIdUrl(id) {
        return baseURL + "payment_types/" + id;
    }

    static getAllPersonUrl() {
        return baseURL + "person";
    }
    static getPersonByIdUrl(id) {
        return baseURL + "person/" + id;
    }
    static getaddPersonUrl() {
        return baseURL + "person/add";
    }
    static getdeletePersonByIdUrl(id) {
        return baseURL + "person/" + id;
    }

    static getAllBanksUrl() {
        return baseURL + "banks";
    }
    static getBankByIdUrl(id) {
        return baseURL + "banks/" + id;
    }
    static getaddBankUrl() {
        return baseURL + "banks/add";
    }
    static getdeleteBankByIdUrl(id) {
        return baseURL + "banks/" + id;
    }

    static getAllProviderTypesUrl() {
        return baseURL + "provider_types";
    }
    static getProviderTypesByIdUrl(id) {
        return baseURL + "provider_types/" + id;
    }
    static getaddProviderTypesUrl() {
        return baseURL + "provider_types/add";
    }
    static getdeleteProviderTypesByIdUrl(id) {
        return baseURL + "provider_types/" + id;
    }

    static getAllIncomeTypesUrl() {
        return baseURL + "income_types";
    }
    static getIncomeTypesByIdUrl(id) {
        return baseURL + "income_types/" + id;
    }
    static getaddIncomeTypesUrl() {
        return baseURL + "income_types/add";
    }
    static getdeleteIncomeTypesByIdUrl(id) {
        return baseURL + "income_types/" + id;
    }

}

export default urllistExp_Income;
