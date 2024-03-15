const { Router } = require("express");
const controller = require("./controllerAccount");
const controllerDC = require("./controllerDC");
const controllerConges = require("./controllerConges");
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

module.exports = router;