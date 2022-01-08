import React from 'react'
import { NavLink, Link } from "react-router-dom";
export const Common = () => {
    return (
    <div class="container fixed  bg-black h-full w-40 text-white">
        <NavLink to="/admin_H0W41294EN" className="px-5 pt-2"><i class="fas fa-backward"></i><i class="fas fa-backward"></i></NavLink>
        <Link
          to="/admin_H0W41294EN/products"
          className="pt-20"
        >
          <h5 class="text-3xl font-bold mb-4 pt-10 ">Products</h5>
        </Link>
        <Link
          to="/admin_H0W41294EN/token"
          class=" "
        >
          <h5 class="text-3xl font-bold mb-4 pt-10">Tokens</h5>
        </Link>
        <Link
          to="/admin_H0W41294EN/customers"
          class=" "
        >
          <h5 class="text-3xl font-bold mb-4 pt-10">Customers</h5>
        </Link>
        <Link
          to="/admin_H0W41294EN/Orders"
          class=" "
        >
          <h5 class="text-3xl font-bold mb-4 pt-10">Orders</h5>
        </Link>
        <a href="http://localhost:3000/api/orders/pdfDownload">
        <h5 class="text-3xl font-bold mb-4 pt-10">Stats</h5>
        </a>
    </div>
    )
}

