const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");
//get 200
const getIncomes = (req, res) => {
    pool.query(queries.getIncomes, (error, results) => {
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
const getIncomeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIncomeById, [id], (error, results) => {
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
const addIncome = async (req, res) => {
    const { provider_id, person_id, credited_bank_id, income_type_id, amount, details, daterecieved } = req.body;
    pool.query(
        queries.addIncome, [provider_id, person_id, credited_bank_id, income_type_id, amount, details, daterecieved],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Income added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );
};

//delete-200with content or 204 without content
const deleteIncomeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIncomeById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Income does not exist in the database");
            } else {
                pool.query(queries.deleteIncomeById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Income id: " + id + " deleted Successfully!");
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
const updateIncome = async (req, res) => {
    const id = parseInt(req.params.id);
    const { provider_id, person_id, credited_bank_id, income_type_id, amount, details, daterecieved } = req.body;
    pool.query(queries.getIncomeById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Income does not exist in the database");
            } else {
                pool.query(
                    queries.updateExpenses, [id, provider_id, person_id, credited_bank_id, income_type_id, amount, details, daterecieved],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Income updated Successfully!");
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

//get 200
const getAllPerson = (req, res) => {
    pool.query(queries.getAllPerson, (error, results) => {
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
const getPersonById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPersonById, [id], (error, results) => {
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
const addPerson = async (req, res) => {
    const { firstname, familyname } = req.body;
    //add shop to db
    pool.query(
        queries.addPerson, [firstname, familyname],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Person added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deletePersonById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPersonById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Person does not exist in the database");
            } else {
                pool.query(queries.deletePersonById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Person id: " + id + " deleted Successfully!");
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
const getAllBanks = (req, res) => {
    pool.query(queries.getAllBanks, (error, results) => {
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
const getBankById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBankById, [id], (error, results) => {
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
const addBank = async (req, res) => {
    const { bankname } = req.body;
    //add shop to db
    pool.query(
        queries.addBank, [bankname],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Bank added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteBankById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBankById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Bank does not exist in the database");
            } else {
                pool.query(queries.deleteBankById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Bank id: " + id + " deleted Successfully!");
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
const getAllProviderTypes = (req, res) => {
    pool.query(queries.getAllProviderTypes, (error, results) => {
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
const getProviderTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getProviderTypesById, [id], (error, results) => {
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
const addProviderTypes= async (req, res) => {
    const { label } = req.body;
    //add shop to db
    pool.query(
        queries.addProviderTypes, [label],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Provider type added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteProviderTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getProviderTypesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Provider type does not exist in the database");
            } else {
                pool.query(queries.deleteProviderTypesById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Providr type id: " + id + " deleted Successfully!");
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
const getAllIncomeTypes = (req, res) => {
    pool.query(queries.getAllIncomeTypes, (error, results) => {
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
const getIncomeTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIncomeTypesById, [id], (error, results) => {
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
const addIncomeTypes = async (req, res) => {
    const { label } = req.body;
    //add shop to db
    pool.query(
        queries.addIncomeTypes, [label],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Income type added Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err.message });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteIncomeTypesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIncomeTypesById, [id], (error, results) => {
        try {
            const noExpensesFound = !results.rows.length;
            if (noExpensesFound) {
                res.status(202).json("Income type does not exist in the database");
            } else {
                pool.query(queries.deleteIncomeTypesById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Income type id: " + id + " deleted Successfully!");
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
    getIncomes,
    getIncomeById,
    addIncome,
    updateIncome,
    deleteIncomeById,

    getAllPerson,
    getPersonById,
    addPerson,
    deletePersonById,
   
    getAllBanks,
    getBankById,
    addBank,
    deleteBankById,

    getAllProviderTypes,
    getProviderTypesById,
    addProviderTypes,
    deleteProviderTypesById,

    getIncomeTypesById,
    getAllIncomeTypes,
    addIncomeTypes,
    deleteIncomeTypesById,
};