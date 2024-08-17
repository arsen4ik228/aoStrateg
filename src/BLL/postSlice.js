import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Используйте redux-persist для более удобной работы с localStorage

// Создаем асинхронную thunk для загрузки данных из localStorage
const loadProductIdsFromStorage = createAsyncThunk(
  'post/loadProductIds',
  async () => {
    const storedData = await storage.getItem('productIds');
    return storedData? JSON.parse(storedData) : [];
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    generation: '',
    booklet: 'Доступ',
    accessType: 'Электронный',
    quantity: '',
    city: '',
    productIds: [],
  },
  reducers: {
    setGeneration: (state, action) => {
      state.generation = action.payload;
    },
    setBuklet: (state, action) => {
      state.booklet = action.payload;
    },
    setAccessType: (state, action) => {
      state.accessType = action.payload;
    },
    setquantity: (state, action) => {
      state.quantity = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setProductIds: (state, action) => {
      state.productIds = action.payload;
      // Сохраняем productIds в localStorage
      storage.setItem('productIds', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProductIdsFromStorage.fulfilled, (state, action) => {
      state.productIds = action.payload;
    });
  },
});

// Экспортируем действия и редюсер
export const { setGeneration, setBuklet, setAccessType, setquantity, setCity, setProductIds } = postSlice.actions;
export const loadProductIds = loadProductIdsFromStorage;
export default postSlice.reducer;

// В вашем компоненте или корневом reducer'е используйте loadProductIds для загрузки данных при монтировании приложения
