import { Router } from "express";
import {
    getIngredients, getIngredientById, createIngredient, updateIngredient, patchIngredient, deleteIngredient
} from "./controller.js";

const router = Router();

router.get("/", getIngredients);
router.get("/:id", getIngredientById);
router.post("/", createIngredient);
router.put("/:id", updateIngredient);
router.patch("/:id", patchIngredient);
router.delete("/:id", deleteIngredient);

export default router;

