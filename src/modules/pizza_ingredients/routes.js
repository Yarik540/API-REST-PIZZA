import { Router } from "express";
import {
    getPizzaIngredients,
    getPizzaIngredientById,
    createPizzaIngredient,
    updatePizzaIngredient,
    deletePizzaIngredient
} from "./controller.js";

const router = Router();

router.get("/", getPizzaIngredients);
router.get("/:piz_id/:ing_id", getPizzaIngredientById);
router.post("/", createPizzaIngredient);
router.put("/:piz_id/:ing_id", updatePizzaIngredient);
router.delete("/:piz_id/:ing_id", deletePizzaIngredient);

export default router;
