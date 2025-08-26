// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find(item => item.id === product.id);

            if (existing) {
                existing.quantity = Math.min(existing.quantity + 1, 9);
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity = Math.min(item.quantity + 1, 9);
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity = Math.max(item.quantity - 1, 1);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
