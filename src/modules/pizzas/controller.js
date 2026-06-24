import { db } from "../../config/database.js";

const getPizzas = async (req, res) => {

    try {
        const response = await db.any("SELECT * FROM pizzas");
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: 'Error al consultar pizzas',
                error: error.message
            }
        )
    }
};


const getPizzaById = async (req, res) => {
    const piz_id = req.params.id;
    try {
        const response = await db.any(`SELECT * FROM pizzas 
            WHERE piz_id = $1::int;`, [piz_id]);
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: 'Error al consultar pizza por ID',
                error: error.message
            }
        )
    }
};

const createPizza = async (req, res) => {
    const { piz_name, piz_origin } = req.body;
    try {
        const response = await db.one(
            `INSERT INTO pizzas(piz_name, piz_origin)
             VALUES ($1, $2)
             RETURNING *;`,
            [piz_name, piz_origin]
        );
        res.json(response);
    } catch (error) {
        console.error("Error al crear pizza:", error);
        res.status(500).json({
            mensaje: "Error al crear pizza",
            error: error.message
        });
    }
};

const updatePizza = async (req, res) => {
    const { id } = req.params;
    const { piz_name, piz_origin, piz_state } = req.body;

    try {
        const response = await db.one(
            `UPDATE pizzas
             SET piz_name = $1,
                 piz_origin = $2,
                 piz_state = $3
             WHERE piz_id = $4::int
             returning *;`,
            [piz_name, piz_origin, piz_state, id]
        );
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al actualizar pizza",
                error: error.message
            }
        );
    }
};

const patchPizza = async (req, res) => {
    const { id } = req.params;
    const { piz_name, piz_origin, piz_state } = req.body;

    try {
        const response = await db.oneOrNone(
            `UPDATE pizzas
             SET 
                piz_name = COALESCE($1, piz_name),
                piz_origin = COALESCE($2, piz_origin),
                piz_state = COALESCE($3, piz_state)
             WHERE piz_id = $4::int
             returning*;`,
            [piz_name, piz_origin, piz_state, id]
        );
        res.json(response);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar parcialmente pizza",
            error: error.message
        });
    }
};

const deletePizza = async (req, res) => {
    const { id: piz_id } = req.params;

    try {
        const response = await db.one(
            `DELETE FROM pizzas
             WHERE piz_id = $1
             returning*;`,
            [piz_id]
        );

        res.json({
            mensaje: "Pizza eliminada correctamente",
            pizza: response
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar pizza",
            error: error.message
        });
    }
};

export {
    getPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    patchPizza,
    deletePizza
};