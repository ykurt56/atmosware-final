import React from "react";
import Navbar from "./Navbar";

const Admin: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4  flex justify-center items-center pt-8">
        Welcome to the Admin Page
      </h1>
      <p className="text-lg text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex iste odio
        facere asperiores odit, cupiditate porro minus corrupti autem
        consectetur. Voluptatibus beatae qui unde eum, deleniti pariatur
        mollitia cumque voluptas.
      </p>
    </div>
  );
};

export default Admin;
