const { Router } = require("express");
const controller = require("./controllerAccount");
const controllerDC = require("./controllerDC");
const controllerConges = require("./controllerConges");
const controllerExpenses = require("./controllerExpenses");
const controllerIncome = require("./controllerIncome");
const controllerTask = require("./controllerTask");
const controllerBourse = require("./controllerBourse");
const controllerSgb = require("./controllerSGB");

const router =  Router();

router.post("/account", controller.getAuthentification);
router.get("/account", controller.getAccounts);
router.post("/account/add", controller.addAccount);
router.get("/account/:id", controller.getAccountById);
router.put("/account/:id", controller.updateAccount);
router.delete("/account/:id", controller.deleteAccountById);


router.get("/dc", controllerDC.getDCs);
router.get("/dcByManager/:id", controllerDC.getDCsByManagerID);
router.post("/dc/add", controllerDC.addDC);
router.get("/dc/:id", controllerDC.getDCById);
router.get("/dc/candidat/:id", controllerDC.getDCByIdCandidat);
router.get("/dc/doc/:id", controllerDC.getDCDocById);
router.put("/dc/candidat/:id", controllerDC.updateDCDoc);
router.put("/dc/:id", controllerDC.updateDCDoc);
router.put("/dcAdmin/:id", controllerDC.updateDCByAdmin);
router.delete("/dc/:id", controllerDC.deleteDCById);

router.get("/dc-status", controllerDC.getAllDcStatus);

router.get("/conges", controllerConges.getConges);
router.post("/conges/add", controllerConges.addConges);
router.get("/conges/:id", controllerConges.getCongesById);
router.put("/conges/:id", controllerConges.updateConges);
router.delete("/conges/:id", controllerConges.deleteCongesById);

router.get("/type_conges", controllerConges.getAllTypeConges);

router.get("/soldes", controllerConges.getSoldes);
router.get("/soldes/:id", controllerConges.getSoldesById);
router.put("/soldes/:id", controllerConges.updateSoldes);

router.get("/expenses", controllerExpenses.getExpenses);
router.post("/expenses/add", controllerExpenses.addExpenses);
router.get("/expenses/:id", controllerExpenses.getExpensesById);
router.put("/expenses/:id", controllerExpenses.updateExpenses);
router.delete("/expenses/:id", controllerExpenses.deleteExpensesById);

router.get("/type_expenses", controllerExpenses.getAllTypeExpenses);
router.get("/type_expenses/:id", controllerExpenses.getExpenseTypesById);
router.post("/type_expenses/add", controllerExpenses.addExpenseTypes);
router.delete("/type_expenses/:id", controllerExpenses.deleteExpenseTypesById);

router.get("/shops", controllerExpenses.getAllShops);
router.get("/shops/:id", controllerExpenses.getShopById);
router.post("/shops/add", controllerExpenses.addShop);
router.delete("/shops/:id", controllerExpenses.deleteShopById);

router.get("/payment_types", controllerExpenses.getAllPaymentTypes);
router.get("/payment_types/:id", controllerExpenses.getPaymentTypesById);
router.post("/payment_types/add", controllerExpenses.addPaymentTypes);
router.delete("/payment_types/:id", controllerExpenses.deletePaymentTypesById);

router.get("/income", controllerIncome.getIncomes);
router.get("/income/:id", controllerIncome.getIncomeById);
router.post("/income/add", controllerIncome.addIncome);
router.put("/income/:id", controllerIncome.updateIncome);
router.delete("/income/:id", controllerIncome.deleteIncomeById);

router.get("/person", controllerIncome.getAllPerson);
router.get("/person/:id", controllerIncome.getPersonById);
router.post("/person/add", controllerIncome.addPerson);
router.delete("/person/:id", controllerIncome.deletePersonById);

router.get("/banks", controllerIncome.getAllBanks);
router.get("/banks/:id", controllerIncome.getBankById);
router.post("/banks/add", controllerIncome.addBank);
router.delete("/banks/:id", controllerIncome.deleteBankById);

router.get("/provider_types", controllerIncome.getAllProviderTypes);
router.get("/provider_types/:id", controllerIncome.getProviderTypesById);
router.post("/provider_types/add", controllerIncome.addProviderTypes);
router.delete("/provider_types/:id", controllerIncome.deleteProviderTypesById);

router.get("/income_types", controllerIncome.getAllIncomeTypes);
router.get("/income_types/:id", controllerIncome.getIncomeTypesById);
router.post("/income_types/add", controllerIncome.addIncomeTypes);
router.delete("/income_types/:id", controllerIncome.deleteIncomeTypesById);


router.get("/tasks", controllerTask.getTasks);
router.post("/task/add", controllerTask.addTask);
router.get("/task/:id", controllerTask.getTaskById);
router.put("/task/:id", controllerTask.updateTask);
router.delete("/task/:id", controllerTask.deleteTaskById);

router.get("/bourses", controllerBourse.getBourses);
router.post("/bourse/add", controllerBourse.addBourse);
router.get("/bourse/:id", controllerBourse.getBourseById);
router.put("/bourse/:id", controllerBourse.updateBourse);
router.delete("/bourse/:id", controllerBourse.deleteBourseById);

router.get("/sgbs", controllerSgb.getSgbs);
router.post("/sgb/add", controllerSgb.addSgb);
router.get("/sgb/:id", controllerSgb.getSgbById);
router.put("/sgb/:id", controllerSgb.updateSgb);
router.delete("/sgb/:id", controllerSgb.deleteSgbById);

module.exports = router;