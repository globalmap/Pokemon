import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PokemonInitialStateType } from '../types/pokemonSlice.types';
import { loadingType } from '../../types/basicTypes';
import axiosInstance from '../../api/axiosInstance';

// Асинхронна дія для завантаження покемонів
export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async () => {
  const response = await axiosInstance.get('pokemon/all');
  return response.data;
});

const initialState: PokemonInitialStateType = {
  list: [],
  loading: loadingType.IDLE,
  error: ""
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = loadingType.PENDING;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = loadingType.SUCCESS;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = loadingType.ERROR;
        state.error = action.error.message || "UKNOWN ERROR";
      });
  },
});

export default pokemonsSlice.reducer;