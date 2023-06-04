import { createSlice } from '@reduxjs/toolkit';

interface ISpend {
  category: string;
  date: string;
  operationName: string;
  sum: number;
}

const initialState: Record<string, ISpend> = {};

const spendSlice = createSlice({
  name: 'spend',
  initialState,
  reducers: {
    addSpend(state, action) {
      const { spendId, spendData } = action.payload;
      state[spendId] = spendData;
    },
    updateSpend(state, action) {
      const { spendId, updatedSpendData } = action.payload;
      state[spendId] = {
        ...updatedSpendData,
      };
    },
    removeSpend(state, action) {
      const spendId = action.payload;
      delete state[spendId];
    },
  },
});

export const { addSpend, updateSpend, removeSpend } = spendSlice.actions;

export default spendSlice.reducer;
