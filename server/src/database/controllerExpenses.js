const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");
//get 200
const getExpenses = (req, res) => {
    pool.query(queries.getExpenses, (error, results) => {
        try {
            if (error) throw error;
            //console.log("dtdebut: "+ new Date(results.rows[0].date_debut).toLocaleDateString());
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getExpensesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getExpensesById, [id], (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//post-201
const addExpenses = async (req, res) => {
    const { expense_type_id, shop_id, person_id, bank_id, payment_id, amount, details, datepurchase } = req.body;
    //add Expenses to db
    pool.query(
        queries.addExpenses, [expense_type_id, shop_id, person_id, bank_id, payment_id, amount, details, datepurchase],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Expenses created Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteExpensesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getExpensesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Expenses does not exist in the database");
            } else {
                pool.query(queries.deleteExpensesById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Expenses id: " + id + " deleted Successfully!");
                    } catch (err) {
                        res.status(203).json({ error: "Error Database! " + err });
                    }
                });
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//put 201
const updateExpenses = async (req, res) => {
    const id = parseInt(req.params.id);
    const { expense_type_id, shop_id, person_id, bank_id, payment_id, amount, details, datepurchase } = req.body;
    pool.query(queries.getExpensesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Expenses does not exist in the database");
            } else {
                pool.query(
                    queries.updateExpenses, [id, expense_type_id, shop_id, person_id, bank_id, payment_id, amount, details, datepurchase],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Expenses updated Successfully!");
                        } catch (err) {
                            res.status(203).json({ error: "Error Database! " + err });
                        }
                    }
                );
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get-200
const getAllTypeExpenses = (req, res) => {
    try {
        pool.query(queries.getAllTypeExpenses, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    } catch (err) {
        console.log("catch: " + err);
        res.status(203).json({ error: "Error Database! " + err });
    }
};

//get 200
const getExpenseTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getExpenseTypesById, [id], (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//post-201
const addExpenseTypes = async (req, res) => {
    const { label } = req.body;
    //add Expenses to db
    pool.query(
        queries.addExpenseTypes, [label],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Expense type created Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteExpenseTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getExpenseTypesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Expenses does not exist in the database");
            } else {
                pool.query(queries.deleteExpenseTypesById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Expenses id: " + id + " deleted Successfully!");
                    } catch (err) {
                        res.status(203).json({ error: "Error Database! " + err });
                    }
                });
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getAllShops = (req, res) => {
    pool.query(queries.getAllShops, (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getShopById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getShopById, [id], (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//post-201
const addShop = async (req, res) => {
    const { label } = req.body;
    //add shop to db
    pool.query(
        queries.addShop, [label],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Shop added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteShopById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getShopById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Shop does not exist in the database");
            } else {
                pool.query(queries.deleteShopById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Shop id: " + id + " deleted Successfully!");
                    } catch (err) {
                        res.status(203).json({ error: "Error Database! " + err });
                    }
                });
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getAllPaymentTypes = (req, res) => {
    pool.query(queries.getAllPaymentTypes, (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getPaymentTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPaymentTypesById, [id], (error, results) => {
        try {
            if (error) throw error;
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//post-201
const addPaymentTypes = async (req, res) => {
    const { label } = req.body;
    //add shop to db
    pool.query(
        queries.addPaymentTypes, [label],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Payment type added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deletePaymentTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPaymentTypesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Payment type does not exist in the database");
            } else {
                pool.query(queries.deletePaymentTypesById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Payment type id: " + id + " deleted Successfully!");
                    } catch (err) {
                        res.status(203).json({ error: "Error Database! " + err });
                    }
                });
            }
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

module.exports = {
    getExpenses,
    getExpensesById,
    addExpenses,
    deleteExpensesById,
    updateExpenses,
    getAllTypeExpenses,
    getExpenseTypesById,
    addExpenseTypes,
    deleteExpenseTypesById,
    getAllShops,
    getShopById,
    addShop,
    deleteShopById,
    getAllPaymentTypes,
    getPaymentTypesById,
    addPaymentTypes,
    deletePaymentTypesById,

};