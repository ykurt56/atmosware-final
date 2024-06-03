import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Orders: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Order List</h1>
      </div>
    </div>
  );
};

export default Orders;
