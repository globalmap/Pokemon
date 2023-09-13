import { Router } from "express";
import pokemonController from "../controllers/pokemon.controller";

const router = Router();

router.get("/all", pokemonController.getAllPokemon);
router.get("/search", pokemonController.serchPokemon);
router.get("/type", pokemonController.getType);
router.get("/art/:name", pokemonController.getPokemonArt);
router.get("/:name", pokemonController.getPokemonData);


export default router;