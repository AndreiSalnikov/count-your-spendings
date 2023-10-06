import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

interface DateState {
  year: number;
  month: string;
}

const initialState: DateState = {
  year: new Date().getFullYear(),
  month: monthNames[new Date().getMonth()],
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
    setMonth(state, action: PayloadAction<string>) {
      state.month = action.payload;
    },
  },
});

export const { setYear, setMonth } = dateSlice.actions;
export default dateSlice.reducer;
