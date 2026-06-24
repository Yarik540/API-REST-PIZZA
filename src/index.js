// Importar Express correctamente
import express from 'express';
import routesPizzas from "./modules/pizzas/routes.js";
import routesIngredients from "./modules/ingredients/routes.js";
import routesPizzaIngredients from "./modules/pizza_ingredients/routes.js";

const app = express();   // Crear la aplicación
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Rutas
app.use(routesPizzas);
app.use("/ingredients", routesIngredients);
app.use("/pizzaIngredients", routesPizzaIngredients); 

// Ejecución del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
