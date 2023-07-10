import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilmInterface {
    image: string,
    banner: string,
    actors: string,
    title: string,
    year: number,
    nation: string,
    length: string,
    genre: string,
    trailer: string,
    details: string,
    id: string,
}

const initialState: FilmInterface[] = [
    {
        image: '',
        banner: '',
        actors: '',
        title: '',
        year: 0,
        nation: '',
        length: '',
        genre: '',
        trailer: '',
        details: '',
        id: '',
    }
]

// export const fetchFilmData = createAsyncThunk<FilmInterface[]>(
//     'listOfFilm/fetchFilmData',
//     async (): Promise<FilmInterface[]> => {
//         try {
//             const response = await fetch('https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm');
//             if (!response.ok) {
//                 throw new Error('Fail to fetch Data at HomePage');
//             } else {
//                 let data: FilmInterface[] = await response.json();
//                 return data;
//             }
//         } catch (error) {
//             console.log(">>>ERROR: " + error);
//             throw error;
//         }
//     }
// )

export const filmSlice = createSlice({
    name: 'filmSlice',
    initialState,
    reducers: {
        addFilm: (state, action: PayloadAction<FilmInterface>) => {
            console.log('successfully add film')
            state.push(action.payload);
        },
        removeFilm: (state, action: PayloadAction<FilmInterface>) => {
            state.filter((film) => film.id === action.payload.id)
        },
        updateFilm: (state, action: PayloadAction<FilmInterface>) => {

        },
        createListFilm: (state, action: PayloadAction<FilmInterface[]>) => {
            state = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchFilmData.fulfilled, (state, action: PayloadAction<FilmInterface[]>) => {
    //         // state.values = action.payload.values
    //     })
    // }
})

export const {addFilm, removeFilm, updateFilm} = filmSlice.actions;

export default filmSlice.reducer;