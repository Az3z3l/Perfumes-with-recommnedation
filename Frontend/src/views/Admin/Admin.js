import React from "react";
import "./Admin.css";
import { NavLink, Link } from "react-router-dom";


const Admin = () => {
  return (
    <>
      <div className="container md:m-60 md:grid flex flex-col mt-10  ml-10  grid-flow-col grid-cols-3 grid-rows-2  gap-20 admins">
        <Link
          to="/admin_H0W41294EN/products"
          class="bg-white rounded shadow border p-6 w-64 hover:scale-125 transform-gpu "
        >
          <h5 class="text-3xl font-bold mb-4 mt-0">Products</h5>
          <p class="text-gray-700 text-sm">Content goes here</p>
        </Link>
        <Link
          to="/admin_H0W41294EN/customers"
          class="bg-white rounded shadow border p-6 w-64 hover:scale-125 transform-gpu"
        >
          <h5 class="text-3xl font-bold mb-4 mt-0">Customers</h5>
          <p class="text-gray-700 text-sm">Content goes here</p>
        </Link>
        <Link
          to="/admin_H0W41294EN/token"
          class="bg-white rounded shadow border p-6 w-64 hover:scale-125 transform-gpu"
        >
          <h5 class="text-3xl font-bold mb-4 mt-0">Tokens</h5>
          <p class="text-gray-700 text-sm">Create Codes/Tokens</p>
        </Link>
        <a
          href="/assets/zfqab-8s7fy.pdf"
          class="bg-white rounded shadow border p-6 w-64 hover:scale-125 transform-gpu"
        >
          <h5 class="text-3xl font-bold mb-4 mt-0">Stats</h5>
          <p class="text-gray-700 text-sm">Content goes here</p>
        </a>
        <Link
          to="/admin_H0W41294EN/Orders"
          class="bg-white rounded shadow border p-6 w-64 hover:scale-125 transform-gpu"
        >
          <h5 class="text-3xl font-bold mb-4 mt-0">Tokens</h5>
          <p class="text-gray-700 text-sm">Create Codes/Tokens</p>
        </Link>
      </div>
    </>
  );
};

export default Admin;
