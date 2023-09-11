import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './slices/pokemonsSlice';

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});



export default store;