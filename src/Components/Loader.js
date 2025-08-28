"use client";
import React from "react";
import { HashLoader } from "react-spinners";

export default function Loader({ loading = true, size = 60, color = "#36d7b7" }) {
    if (!loading) return null;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <HashLoader color={color} size={size} />
        </div>
    );
}
