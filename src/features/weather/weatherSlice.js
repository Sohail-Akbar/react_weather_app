import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (cityName, thunkAPI) => {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no&alerts=no`
        );
        if (!res.ok) throw new Error('City not found or API Error');
        return res.json();
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        city: 'Lahore',
        data: null,
        loading: false,
        error: '',
    },
    reducers: {
        setCity(state, action) {
            state.city = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather';
                state.data = null;
            });
    },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
