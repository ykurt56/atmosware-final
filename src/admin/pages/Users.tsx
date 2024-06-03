import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getUsers } from "../../services/userApi";

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
        <ul>
          {users.map((user) => (
            <div className="mb-4 text-center" key={user.id}>
              <hr />
              <h3 className="text-lg font-bold">
                İD = {user.id} - Name = {user.name}
              </h3>
              <br />

              <h3 className="text-lg font-bold">Email = {user.email}</h3>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
