const pool = require("../../db");
const queries = require("./queries");
const tools = require("./tools");

//get 200
const getTasks = (req, res) => {
    pool.query(queries.getTasks, (error, results) => {
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
const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getTaskById, [id], (error, results) => {
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
const addTask = async (req, res) => {
    const { task_details, person_id, actiondate } = req.body;
    //add task to db
    pool.query(
        queries.addTask, [task_details, person_id, actiondate],
        (error, results) => {
            try {
                if (error) throw error;
                res.status(201).send("Task created Successfully!");
            } catch (err) {
                res.status(203).json({ error: "Error Database! " + err });
            }
        }
    );

};

//delete-200with content or 204 without content
const deleteTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getTaskById, [id], (error, results) => {
        try {
            const noTaskFound = !results.rows.length;
            if (noTaskFound) {
                res.status(202).json("Task does not exist in the database");
            } else {
                pool.query(queries.deleteTaskById, [id], (error, results) => {
                    try {
                        if (error) throw error;
                        res
                            .status(200)
                            .send("Task id: " + id + " deleted Successfully!");
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
const updateTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const {task_details, person_id, actiondate} = req.body;
    pool.query(queries.getTaskById, [id], (error, results) => {
        try {
            const noTaskFound = !results.rows.length;
            if (noTaskFound) {
                res.status(202).json("Task does not exist in the database");
            } else {
                pool.query(
                    queries.updateTask, [id, task_details, person_id, actiondate],
                    (error, results) => {
                        try {
                            if (error) throw error;
                            res.status(201).send("Task updated Successfully!");
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
    getTasks,
    getTaskById,
    addTask,
    deleteTaskById,
    updateTask,
};