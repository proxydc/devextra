const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");
//get 200
const getConges = (req, res) => {
    pool.query(queries.getConges, (error, results) => {
        try {
            if (error) throw error;
            console.log("dtdebut: "+ new Date(results.rows[0].date_debut).toLocaleDateString());
            res.status(200).json(results.rows);
        } catch (err) {
            console.log("catch: " + err);
            res.status(203).json({ error: "Error Database! " + err });
        }
    });
};

//get 200
const getCongesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCongesById, [id], (error, results) => {
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
const addConges = async (req, res) => {
    const { date_debut, date_fin, type_conges, nbjours, descriptions } = req.body;
    console.log("dtdebut: "+ date_debut);
    console.log("dtfin: "+date_fin);
    //check if conges name exists
    pool.query(queries.checkCongesExists, [date_debut], (error, results) => {
        try {
            if (error) throw error;
            if (results.rows.length) {
                res.status(202).json("Conges already exists.");
            } else {
                //add conges to db
                pool.query(
                    queries.addConges, [date_debut, date_fin, type_conges, nbjours, descriptions],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Conges created Successfully!");
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
const deleteCongesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCongesById, [id], (error, results) => {
        try {
            const noCongesFound = !results.rows.length;
            if (noCongesFound) {
                res.status(202).json("Conges does not exist in the database");
            } else {
                pool.query(queries.deleteCongesById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Conges id: " + id + " deleted Successfully!");
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
const updateConges = async (req, res) => {
    const id = parseInt(req.params.id);
    const { type_conges, descriptions } = req.body;
    pool.query(queries.getCongesById, [id], (error, results) => {
        try {
            const noCongesFound = !results.rows.length;
            if (noCongesFound) {
                res.status(202).json("Conges does not exist in the database");
            } else {
                pool.query(
                    queries.updateConges, [id, type_conges, descriptions],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Conges updated Successfully!");
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
const getAllTypeConges = (req, res) => {
    try {
        pool.query(queries.getAllTypeConges, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    } catch (err) {
        console.log("catch: " + err);
        res.status(203).json({ error: "Error Database! " + err });
    }
};
module.exports = {
    getConges,
    getCongesById,
    addConges,
    deleteCongesById,
    updateConges,
    getAllTypeConges,
};