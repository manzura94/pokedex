import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios from 'axios';
import { PokemonProps } from '../components/HomePage';

interface PokemonState {
    list: PokemonProps[];
    favorites: [];
    searchTerm: string;
    selectedType: string;
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
    console.log("Fetch Response:", response.data);
    const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon: PokemonState) => {
            const res = await axios.get(pokemon.url);

            return {
                id: res.data.id.toString(),
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
        setSelectedType: (state: { selectedType: string }, action: PayloadAction<string>) => {
            state.selectedType = action.payload;
        },
        setSelectedItem: (state: PokemonState, action: PayloadAction<PokemonProps>) => {
            state.selectedItem = action.payload;
        },
        addFavorite: (state: { favorites: PokemonProps[] }, action: PayloadAction<PokemonProps>) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state: { favorites: PokemonProps[] }, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter((pokemon) => pokemon.id !== action.payload);
        },
        resetList: (state: PokemonState) => {
            state.list = [];
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<PokemonState>) => {
        builder
            .addCase(fetchPokemons.pending, (state: PokemonState) => {
                state.loading = true;
            })
            .addCase(fetchPokemons.fulfilled, (state: PokemonState, action: PayloadAction<PokemonProps[]>) => {
                state.loading = false;
                state.list = [...state.list, ...action.payload];
            })

            .addCase(fetchPokemons.rejected, (state: PokemonState) => {
                state.loading = false;
            });
    },
});
export const { setSearchTerm, setSelectedType, setSelectedItem, addFavorite, removeFavorite, resetList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
