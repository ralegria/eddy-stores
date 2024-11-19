import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    isCartOpen: false,
    topBanners: [],
  },
  reducers: {
    switchCartStatus: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setTopBanners: (state, action) => {
      state.topBanners = action.payload.filter((banner) => {
        return (
          moment().isBetween(banner.start_date, banner.end_date) && {
            ...banner,
            closed: false,
          }
        );
      });
      /* state.topBanners = action.payload.map((banner) => ({
        ...banner,
        closed: false,
      })); */
    },
    closeTopBanner: (state, action) => {
      const closedBanner = state.topBanners.find(
        (banner) => banner.id === action.payload
      );
      const banners = state.topBanners.filter(
        (banner) => banner.id !== action.payload
      );
      state.topBanners = [
        ...banners,
        {
          ...closedBanner,
          closed: true,
        },
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchCartStatus, setTopBanners, closeTopBanner } =
  layoutSlice.actions;

export default layoutSlice.reducer;
