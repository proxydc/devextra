const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");

//get 200
const getPrets = (req, res) => {
    pool.query(queries.getPrets, (error, results) => {
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
const getPretById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPretById, [id], (error, results) => {
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
const addPret = async (req, res) => {
    const { person_id, bank_id, pret_amount, mensuel_amount, nb_mois, interest, pret_details,starting_date, end_date } = req.body;
    //add pret to db
    pool.query(
        queries.addPret, [person_id, bank_id, pret_amount, mensuel_amount, nb_mois, interest, pret_details,starting_date, end_date],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Pret created Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err });
            }
        }
    );

};

//delete-200with content or 204 without content
const deletePretById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getPretById, [id], (error, results) => {
        try {
            const noPretFound = !results.rows.length;
            if (noPretFound) {
                res.status(202).json("Pret does not exist in the database");
            } else {
                pool.query(queries.deletePretById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Pret id: " + id + " deleted Successfully!");
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
const updatePret = async (req, res) => {
    const id = parseInt(req.params.id);
    const { person_id, bank_id, pret_amount, mensuel_amount, nb_mois, interest, pret_details,starting_date, end_date } = req.body;
    pool.query(queries.getPretById, [id], (error, results) => {
        try {
            const noPretFound = !results.rows.length;
            if (noPretFound) {
                res.status(202).json("Pret does not exist in the database");
            } else {
                pool.query(
                    queries.updatePret, [id,  person_id, bank_id, pret_amount, mensuel_amount, nb_mois, interest, pret_details,starting_date, end_date ],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Pret updated Successfully!");
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
    getPrets,
    getPretById,
    addPret,
    deletePretById,
    updatePret,
};