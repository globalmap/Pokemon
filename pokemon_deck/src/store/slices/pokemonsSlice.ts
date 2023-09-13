import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonInitialStateType } from '../types/pokemonSlice.types';
import { loadingType } from '../../types/basicTypes';
import axiosInstance from '../../api/axiosInstance';
import { PokemonType } from '../../types/pokemon.types';

// Asynchronous action for loading pokemons
export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async (params: string) => {
  const response = await axiosInstance.get(`pokemon/all?${params}`);
  return response.data;
});

export const fetchPokemonData = createAsyncThunk("pokemons/details", async (name: string) => {
  const response = await axiosInstance.get(`pokemon/${name}`);
  return response.data;
});

export const fetchPokemonTypes = createAsyncThunk("pokemons/types", async () => {
  const response = await axiosInstance.get("pokemon/type");
  return response.data.types;
});

const initialState: PokemonInitialStateType = {
  list: [],
  loading: loadingType.IDLE,
  error: "",
  details: undefined,
  total: 0,
  nextLinkParams: "",
  types: [],
  filter: {
    type: ""
  }
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{type: PokemonType}>) => {
      if(action.payload.type === state.filter.type) {
        state.filter.type = ""
      } else {
      state.filter = {...state.filter, type: action.payload.type}

      }
    },
    clearDetails: (state) => {
      state.details = undefined
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        if(state.list.length === 0) {
          state.loading = loadingType.PENDING;
        }
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = loadingType.SUCCESS;
        state.list = [...state.list, ...action.payload.list];
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
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.types = action.payload.filter((type: any) => type.pokemons.length > 0);
      })
  },
});

export const { setFilter, clearDetails } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;