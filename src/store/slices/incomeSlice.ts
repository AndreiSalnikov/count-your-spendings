import { createSlice } from '@reduxjs/toolkit';

interface IIncome {
  date: string;
  operationName: string;
  sum: number;
}

const initialState: Record<string, IIncome> = {};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncomeStore(state, action) {
      const { incomeId, incomeData } = action.payload;
      state[incomeId] = incomeData;
    },
    updateIncome(state, action) {
      const { incomeId, updatedIncomeData } = action.payload;
      state[incomeId] = {
        ...updatedIncomeData,
      };
    },
    removeIncome(state, action) {
      const incomeId = action.payload;
      delete state[incomeId];
    },
  },
});

export const { addIncomeStore, updateIncome, removeIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
