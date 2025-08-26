"use client"
import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    // Add product to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                // if product already exists, increase quantity
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            // else, add new product with quantity = 1
            return [...prev, { ...product, quantity: 1 }]
        })
    }


    // Increase quantity
    const increaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.min(item.quantity + 1, 9) }
                    : item
            )
        )
    }

    // Decrease quantity
    const decreaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        )
    }


    // Remove product from cart
    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }
    // Count the total cartItems
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
