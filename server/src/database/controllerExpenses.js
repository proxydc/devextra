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
    const { date_debut, date_fin, type_Expenses, nbjours, descriptions } = req.body;
    //console.log("dtdebut: "+ date_debut);
   // console.log("dtfin: "+date_fin);
    //check if Expenses name exists
    pool.query(queries.checkExpensesExists, [date_debut], (error, results) => {
        try {
            if (error) throw error;
            if (results.rows.length) {
                res.status(202).json("Expenses already exists.");
            } else {
                //add Expenses to db
                pool.query(
                    queries.addExpenses, [date_debut, date_fin, type_Expenses, nbjours, descriptions],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Expenses created Successfully!");
                        } catch (err) {
                            res.status(203).json({ error: "Error Database! " + err.message });
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
    const {date_debut, date_fin, type_Expenses, nbjours, descriptions } = req.body;
    pool.query(queries.getExpensesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Expenses does not exist in the database");
            } else {
                pool.query(
                    queries.updateExpenses, [id, date_debut, date_fin, type_Expenses, nbjours, descriptions ],
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

module.exports = {
    getExpenses,
    getExpensesById,
    addExpenses,
    deleteExpensesById,
    updateExpenses,
    getAllTypeExpenses,
};