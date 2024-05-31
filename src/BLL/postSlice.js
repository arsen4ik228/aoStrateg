// generationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
      generation: '1-ое поколение', // Добавлено поле для генерации
      buklet: 'Доступ', // Добавлено поле для булета
      accessType: 'Электронный',
      quantity: '',
    },
    reducers: {
      setGeneration: (state, action) => {
        // Обновляем только поле generation
        state.generation = action.payload;
      },
      setBuklet: (state, action) => {
        // Обновляем только поле buklet
        state.buklet = action.payload;
      },
      setAccessType: (state,action) => {
        state.accessType = action.payload;
      },
      setQuantity: (state, action) => { // Добавленное действие
        state.quantity = action.payload;
      },
    },
  });

export const { setGeneration,setBuklet, setAccessType , setQuantity} = postSlice.actions;

export default postSlice.reducer;
