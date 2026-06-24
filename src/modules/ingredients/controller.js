import { db } from "../../config/database.js";


const getIngredients = async (req, res) => {
    try {
        const response = await db.any("SELECT * FROM ingredients");
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al consultar ingredientes",
                error: error.message
            }
        );
    }
};

const getIngredientById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.any("SELECT * FROM ingredients WHERE ing_id = $1", [id]);
        if (!response) return res.status(404).json(
            {
                mensaje: "Ingrediente no encontrado"
            }
        );
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al consultar ingrediente",
                error: error.message
            }
        );
    }
};


const createIngredient = async (req, res) => {
    const { ing_name, ing_calories, ing_state } = req.body;
    try {
        const response = await db.one(
            `INSERT INTO ingredients(ing_name, ing_calories, ing_state)
             VALUES($1, $2, $3) RETURNING *`,
            [ing_name, ing_calories, ing_state]
        );
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al crear ingrediente",
                error: error.message
            }
        );
    }
};


const updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { ing_name, ing_calories, ing_state } = req.body;
    try {
        const response = await db.oneOrNone(
            `UPDATE ingredients
             SET ing_name = $1, ing_calories = $2, ing_state = $3
             WHERE ing_id = $4 RETURNING *`,
            [ing_name, ing_calories, ing_state, id]
        );
        if (!response) return res.status(404).json(
            {
                mensaje: "Ingrediente no encontrado"
            }
        );
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al actualizar ingrediente",
                error: error.message
            }
        );
    }
};


const patchIngredient = async (req, res) => {
    const { id } = req.params;
    const { ing_name, ing_calories, ing_state } = req.body;
    try {
        const response = await db.oneOrNone(
            `UPDATE ingredients
             SET ing_name = COALESCE($1, ing_name),
                 ing_calories = COALESCE($2, ing_calories),
                 ing_state = COALESCE($3, ing_state)
             WHERE ing_id = $4 RETURNING *`,
            [ing_name, ing_calories, ing_state, id]
        );
        if (!response) return res.status(404).json(
            {
                mensaje: "Ingrediente no encontrado"
            }
        );
        res.json(response);
    } catch (error) {
        res.status(500).json(
            {
                mensaje: "Error al actualizar parcialmente ingrediente",
                error: error.message
            }
        );
    }
};

const deleteIngredient = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await db.oneOrNone(
            `DELETE FROM ingredients WHERE ing_id = $1 RETURNING *`,
            [id]
        );

        if (!response) {
            return res.status(404).json({ mensaje: "Ingrediente no encontrado" });
        }

        res.json({
            mensaje: "Ingrediente eliminado correctamente",
            ingrediente: response
        });
    } catch (error) {
        console.error("Error al eliminar ingrediente:", error);
        res.status(500).json({
            mensaje: "Error al eliminar ingrediente",
            error: error.message
        });
    }
};


export {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    patchIngredient,
    deleteIngredient
};
