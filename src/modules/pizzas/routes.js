import { Router } from "express";
import { getPizzas, getPizzaById,createPizza, updatePizza, patchPizza, deletePizza } from "./controller.js";


const router = Router();

router.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de Pizzería!, saludos Yari");
});

router.get("/pizzas", getPizzas );
router.get("/pizzas/:id", getPizzaById);
router.post("/pizzas", createPizza);
router.put("/pizzas/:id", updatePizza);
router.patch("/pizzas/:id", patchPizza);
router.delete("/pizzas/:id", deletePizza);

export default router;