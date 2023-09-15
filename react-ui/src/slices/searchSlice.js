import { createSlice } from '@reduxjs/toolkit';

export const gameStatusSlice = createSlice({
  name: 'gameStatus',
  initialState: {
    currentDegreeIndex: 0,
    selections: defaultStatus.degreeSelections,
    gameInProgress: false,
    gameOver: false,
    winner: false
  },
  reducers: {
    incrementCurrentDegree: (state) => {
      state.currentDegreeIndex += 1;
    },
    updateDegree: (state, action) => {
      state.selections[state.currentDegreeIndex] = action.payload;
    },
    startGame: (state) => {
      state.gameInProgress = true;
    },
    resetGameStatus: (state) => {
      state.selections = defaultStatus.degreeSelections;
      state.currentDegreeIndex = 0;
      state.gameInProgress = false;
      state.gameOver = false;
      state.winner = false;
    },
    declareWinner: (state) => {
      state.winner = true;
      state.gameOver = true;
    },
    declareLoser: (state) => {
      state.gameOver = true;
    },
    changeTarget: (state, action) => {
      state.selections[state.selections.length - 1] = action.payload;
    }
  }
});

export const {
  incrementCurrentDegree,
  updateDegree,
  startGame,
  resetGameStatus,
  declareWinner,
  declareLoser,
  changeTarget
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
