import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { getUsers } from "../../services/userApi";
import Navbar from "./Navbar";

// Convert Zod schema to Formik validation schema

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
    onSubmit: (values) => {
      const searchTerm = values.searchTerm.toLowerCase();
      const filtered = users.filter((user) =>
        user.id.toString().includes(searchTerm)
      );
      setFilteredUsers(filtered);
    },
  });

  return (
    <div>
      <Navbar />
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg">User App</div>
          <form onSubmit={formik.handleSubmit} className="flex items-center">
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="Search by ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.searchTerm}
              className="p-2 rounded mr-2"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div className="border p-4 rounded shadow" key={user.id}>
              <h3 className="text-lg font-bold">ID: {user.id}</h3>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
