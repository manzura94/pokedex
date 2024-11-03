import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PokemonProps } from '../components/HomePage';

interface PokemonState {
    list: [];
    favorites: [];
    searchTerm: string;
    selectedType: string | null;
    selectedItem: PokemonProps | null;
    url: string;
    id: string;
    loading: boolean;
}

const initialState: PokemonState = {
    list: [],
    favorites: [],
    searchTerm: '',
    selectedType: 'all',
    selectedItem: null,
    url: '',
    id: '',
    loading: true,
};

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async (offset: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
    const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon: PokemonState) => {
            const res = await axios.get(pokemon.url);
            const id = Math.random();

            return {
                id,
                name: res.data.name,
                sprites: res.data.sprites,
                types: res.data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
            };
        })
    );

    return pokemonDetails;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSearchTerm: (state: { searchTerm: string }, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSelectedType: (state: { selectedType: string }, action: PayloadAction<string | null>) => {
            state.selectedType = action.payload;
        },
        setSelectedItem: (state: { selectedItem: string }, action: PayloadAction<string>) => {
            state.selectedItem = action.payload;
        },
        addFavorite: (state: { favorites: string[] }, action: PayloadAction<any>) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter((pokemon) => pokemon.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...state.list, ...action.payload];
            })

            .addCase(fetchPokemons.rejected, (state) => {
                state.loading = false;
            });
    },
});
export const { setSearchTerm, setSelectedType, setSelectedItem, addFavorite, favorites, removeFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
