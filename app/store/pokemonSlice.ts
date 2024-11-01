import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PokemonState {
    list: any[];
    favorites: any[];
    searchTerm: string;
    selectedType: string | null;
}

const initialState: PokemonState = {
    list: [],
    favorites: [],
    searchTerm: '',
    selectedType: 'all',
};


export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async (offset: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
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
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSelectedType: (state, action: PayloadAction<string | null>) => {
            state.selectedType = action.payload;
        },
        addFavorite: (state, action: PayloadAction<any>) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter((pokemon) => pokemon.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...state.list, ...action.payload];
            })
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPokemons.rejected, (state) => {
                state.loading = false;
            });
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchPokemons.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(fetchPokemons.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.list = [...state.list, ...action.payload];
    //             state.offset += action.payload.length;
    //             state.hasMore = action.payload.length > 0;
    //         })
    //         .addCase(fetchPokemons.rejected, (state) => {
    //             state.loading = false;
    //             state.hasMore = false;
    //         });
    // },
});
export const { setSearchTerm, setSelectedType, addFavorite, removeFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
