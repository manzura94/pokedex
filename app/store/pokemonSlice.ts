import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async (offset: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=15`);
    const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
                name: res.data.name,
                sprites: res.data.sprites,
                types: res.data.types.map((typeInfo) => typeInfo.type.name),
            };
        })
    );
    return pokemonDetails;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: { list: [], loading: false, hasMore: true, offset: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...state.list, ...action.payload];
                state.offset += action.payload.length;
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchPokemons.rejected, (state) => {
                state.loading = false;
                state.hasMore = false;
            });
    },
});

export default pokemonSlice.reducer;
