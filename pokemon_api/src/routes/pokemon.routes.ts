import { Router } from "express";
import pokemonController from "../controllers/pokemon.controller";

const router = Router();

router.get("/all", pokemonController.getAllPokemon);
router.get("/:name", pokemonController.getPokemonData);
router.get("/art/:name", pokemonController.getPokemonArt);

export default router;