const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");

//get 200
const getBourses = (req, res) => {
    pool.query(queries.getBourses, (error, results) => {
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
const getBourseById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBourseById, [id], (error, results) => {
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
const addBourse = async (req, res) => {
    const { person_id, annee, echelon, bourse_amount, bourse_merit, dossier_date, is_validated, impot } = req.body;
    //add bourse to db
    pool.query(
        queries.addBourse, [person_id, annee, echelon, bourse_amount, bourse_merit, dossier_date, is_validated, impot],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Bourse created Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteBourseById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBourseById, [id], (error, results) => {
        try {
            const noBourseFound = !results.rows.length;
            if (noBourseFound) {
                res.status(202).json("Bourse does not exist in the database");
            } else {
                pool.query(queries.deleteBourseById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Bourse id: " + id + " deleted Successfully!");
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
const updateBourse = async (req, res) => {
    const id = parseInt(req.params.id);
    const {person_id, annee, echelon, bourse_amount, bourse_merit, dossier_date, is_validated, impot} = req.body;
    pool.query(queries.getBourseById, [id], (error, results) => {
        try {
            const noBourseFound = !results.rows.length;
            if (noBourseFound) {
                res.status(202).json("Bourse does not exist in the database");
            } else {
                pool.query(
                    queries.updateBourse, [person_id, annee, echelon, bourse_amount, bourse_merit, dossier_date, is_validated, impot],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Bourse updated Successfully!");
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
    getBourses,
    getBourseById,
    addBourse,
    deleteBourseById,
    updateBourse,
};