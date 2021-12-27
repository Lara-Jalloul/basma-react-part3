import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "../pages/List";
import Chart from "../pages/Chart";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </>
  );
}

export default Routers;
