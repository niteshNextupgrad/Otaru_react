
"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

// Custom transparent theme
const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
      border: "1px solid rgba(179, 174, 174, 0.87)"
    },
  },
  headCells: {
    style: {
      backgroundColor: "rgba(255,255,255,0.05)",
      color: "#0D6EFD",
      fontWeight: "bold",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
      color: "#fff",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // hover bg
      color: "#fff", // keep text white on hover
      cursor: "pointer",
    },
  },
  cells: {
    style: {
      backgroundColor: "transparent",
      color: "#fff", // row text color (normal)
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      color: "#0D6EFD",
    },
  },
};


export default function TransparentDataTable({ columns, data }) {
    const [filterText, setFilterText] = useState("");

    // filter rows based on search text
    const filteredData = data.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );

    return (
        <div className="card bg-transparent border-0">
            <div className="d-flex justify-content-end mb-3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border w-50"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>

            {/* DataTable */}
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                responsive
                customStyles={customStyles}
            />
        </div>
    );
}
