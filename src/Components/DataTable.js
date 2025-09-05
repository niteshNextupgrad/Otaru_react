
"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

// Custom transparent theme
const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
      // borderLeft: "1px solid rgba(179, 174, 174, 0.87)",
      // borderRight: "1px solid rgba(179, 174, 174, 0.87)"
    },
  },
  headCells: {
    style: {
      backgroundColor: "#2c2727",
      color: "#fff",
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
      borderBottom: '1px solid gray',
      paddingTop: '5px',
      paddingBottom: '5px'
    },
  },
  pagination: {
    style: {
      display: "flex",
      justifyContent: "start",
      backgroundColor: "transparent",
      color: "#fff",
    },
  },
};
const CustomPagination = ({ rowsPerPage, rowCount, onChangePage, currentPage }) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  return (
    <div className="d-flex justify-content-between align-items-center w-100 p-3">
      <button
        className="btn btn-sm btn-light"
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="ri-skip-left-fill"></i>Prev
      </button>

      <span className="mx-2 text-white">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-sm btn-light"
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next<i className="ri-skip-right-fill"></i>
      </button>
    </div>
  );
};


export default function TransparentDataTable({ columns, data }) {
  const [filterText, setFilterText] = useState("");

  // filter rows based on search text
  const filteredData = data?.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <div className="card bg-transparent border-0">
      <div className="d-flex justify-content-end mb-1">
        <div className="col-12 col-md-6 col-lg-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-2"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>


      </div>

      {/* DataTable */}
      {/* <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}

      /> */}
      <DataTable
        columns={columns}
        data={filteredData}   
        pagination
        paginationPerPage={10}
        paginationComponent={CustomPagination} // custom pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />

    </div>
  );
}
