import React, { useEffect, useState } from "react";

const data = [
    { label: "Modern technology", value: 75 },
    { label: "Product quality", value: 90 },
    { label: "Diversification", value: 83 },
    { label: "Immersive experience", value: 75 },
];

const ProgressBars = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 1000);
    }, []);

    return (
        <div className="bg-dark text-white py-4 px-0 px-md-4" style={{ maxWidth: "450px" }}>
            {data.map((item, i) => (
                <div key={i} className="mb-4">
                    {/* Label + Value */}
                    <div className="d-flex justify-content-between small fw-medium">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                    </div>

                    {/* Progress Line */}
                    <div className="progress-line">
                        <div
                            className="progress-fill"
                            style={{ width: animate ? `${item.value}%` : "0%" }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBars;
