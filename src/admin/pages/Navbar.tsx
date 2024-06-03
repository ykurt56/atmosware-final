import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-black text-white py-4">
      <ul className="flex gap-4 justify-center">
        <li>
          <Link to="/admin/addproducts">AddProducts</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
