// import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.monthItem.isLoading;
export const selectError = (state) => state.monthItem.error;
export const selectData = (state) => state.monthItem.data;
// export const selectDataCache = (state) => state.monthItem.cache;
// const selectFilters = (_, { month, year }) => `${month}${year}`;

// export const selectData = createSelector([selectDataCache, selectFilters], (cache, filters) => {
//     const filterKeys = filters;    
//     return cache[filterKeys]||[]
// })
