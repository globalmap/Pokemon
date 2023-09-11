import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PokemonInitialStateType } from '../types/pokemonSlice.types';
import { loadingType } from '../../types/basicTypes';
import axiosInstance from '../../api/axiosInstance';

// Асинхронна дія для завантаження покемонів
export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async (params: string) => {
  const response = await axiosInstance.get(`pokemon/all?${params}`);
  return response.data;
});

export const fetchPokemonData = createAsyncThunk("pokemons/details", async (name: string) => {
  const response = await axiosInstance.get(`pokemon/${name}`);

  return response.data;
})

const initialState: PokemonInitialStateType = {
  list: [],
  loading: loadingType.IDLE,
  error: "",
  details: undefined,
  total: 0,
  nextLinkParams: "",
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
        state.list = action.payload.list;
        state.total = action.payload.total
        state.nextLinkParams = action.payload.nextLinkParams
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = loadingType.ERROR;
        state.error = action.error.message || "UKNOWN ERROR";
      })

      .addCase(fetchPokemonData.fulfilled, (state, action) => {
        state.details = action.payload
      })
  },
});

export default pokemonsSlice.reducer;