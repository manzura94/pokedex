import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async (offset: number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  return response.data.results;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.list.push(...action.payload);
        state.status = 'succeeded';
      });
  },
});

export default pokemonSlice.reducer;
