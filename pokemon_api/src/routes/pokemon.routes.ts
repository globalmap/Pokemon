import { Router } from "express";
import pokemonController from "../controllers/pokemon.controller";

const router = Router();


router.get("/all", pokemonController.getAllPokemon);

export default router;