const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");

//get 200
const getSgbs = (req, res) => {
    pool.query(queries.getSgbs, (error, results) => {
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
const getSgbById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getSgbById, [id], (error, results) => {
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
const addSgb = async (req, res) => {
    const { person_id, bank_id, nominee_id, bond_Ids, interest_percentage, units, bond_details, amount, purchase_date, starting_date, end_date } = req.body;
    //add sgb to db
    pool.query(
        queries.addSgb, [person_id, bank_id, nominee_id, bond_Ids, interest_percentage, units, bond_details, amount, purchase_date, starting_date, end_date],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("SGB created Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteSgbById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getSgbById, [id], (error, results) => {
        try {
            const noSgbFound = !results.rows.length;
            if (noSgbFound) {
                res.status(202).json("Sgb does not exist in the database");
            } else {
                pool.query(queries.deleteSgbById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("SGB id: " + id + " deleted Successfully!");
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
const updateSgb = async (req, res) => {
    const id = parseInt(req.params.id);
    const {person_id, bank_id, nominee_id, bond_Ids, interest_percentage, units, bond_details, amount, purchase_date, starting_date, end_date} = req.body;
    pool.query(queries.getTaskById, [id], (error, results) => {
        try {
            const noSgbFound = !results.rows.length;
            if (noSgbFound) {
                res.status(202).json("SGB does not exist in the database");
            } else {
                pool.query(
                    queries.updateTask, [id, person_id, bank_id, nominee_id, bond_Ids, interest_percentage, units, bond_details, amount, purchase_date, starting_date, end_date],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("SGB updated Successfully!");
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
module.exports = {
    getSgbs,
    getSgbById,
    addSgb,
    deleteSgbById,
    updateSgb,
};