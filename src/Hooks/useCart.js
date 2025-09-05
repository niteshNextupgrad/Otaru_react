// hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} from "@/Redux/Slices/cartSlice";

export function useCart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // Derived state
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return {
        cartItems,
        cartCount,
        clearCart: () => dispatch(clearCart()),
        addToCart: (product) => dispatch(addToCart(product)),
        increaseQuantity: (id) => dispatch(increaseQuantity(id)),
        decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
    };
}
