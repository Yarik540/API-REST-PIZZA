import { db } from "../../config/database.js";

const getPizzaIngredients = async (req, res) => {
    try {
        const response = await db.any(`
            SELECT pi.piz_id, pi.piz_name, ing.ing_id, ing.ing_name, pi_ing.pi_portion
            FROM pizza_ingredients pi_ing
            INNER JOIN pizzas pi ON pi_ing.piz_id = pi.piz_id
            INNER JOIN ingredients ing ON pi_ing.ing_id = ing.ing_id
        `);

        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al consultar pizza_ingredients",
                error: error.message
            }
        );
    }
};


const getPizzaIngredientById = async (req, res) => {
    const { piz_id, ing_id } = req.params;
    try {
        const response = await db.any(`
            SELECT pi.piz_id, pi.piz_name, ing.ing_id, ing.ing_name, pi_ing.pi_portion
            FROM pizza_ingredients pi_ing
            INNER JOIN pizzas pi ON pi_ing.piz_id = pi.piz_id
            INNER JOIN ingredients ing ON pi_ing.ing_id = ing.ing_id
            WHERE pi_ing.piz_id = $1 AND pi_ing.ing_id = $2
        `, [piz_id, ing_id]);

        if (!response) {
            return res.status(404).json({ mensaje: "Relación pizza-ingrediente no encontrada" });
        }

        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al consultar pizza_ingredient",
                error: error.message
            }
        );
    }
};


const createPizzaIngredient = async (req, res) => {
    const { piz_id, ing_id, pi_portion } = req.body;
    try {
        const response = await db.one(
            `INSERT INTO pizza_ingredients(piz_id, ing_id, pi_portion)
             VALUES($1, $2, $3) RETURNING *`,
            [piz_id, ing_id, pi_portion]
        );
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al crear pizza_ingredient",
                error: error.message
            }
        );
    }
};


const updatePizzaIngredient = async (req, res) => {
    const { piz_id, ing_id } = req.params;
    const { pi_portion } = req.body;
    try {
        const response = await db.oneOrNone(
            `UPDATE pizza_ingredients
             SET pi_portion = $1
             WHERE piz_id = $2 AND ing_id = $3
             RETURNING *`,
            [pi_portion, piz_id, ing_id]
        );
        if (!response) return res.status(404).json(
            {
                mensaje: "Relación pizza-ingrediente no encontrada"
            }
        );
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al actualizar pizza_ingredient",
                error: error.message
            }
        );
    }
};


const deletePizzaIngredient = async (req, res) => {
    const { piz_id, ing_id } = req.params;
    try {
        const response = await db.oneOrNone(
            `DELETE FROM pizza_ingredients
             WHERE piz_id = $1 AND ing_id = $2
             RETURNING *`,
            [piz_id, ing_id]
        );
        if (!response) return res.status(404).json(
            {
                mensaje: "Relación pizza-ingrediente no encontrada"
            }
        );
        res.json({
            mensaje: "Relación eliminada correctamente",
            pizza_ingredient: response
        });
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al eliminar pizza_ingredient",
                error: error.message
            }
        );
    }
};

export {
    getPizzaIngredients,
    getPizzaIngredientById,
    createPizzaIngredient,
    updatePizzaIngredient,
    deletePizzaIngredient
};
