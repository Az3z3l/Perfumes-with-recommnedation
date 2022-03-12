import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProducts from "./AddProduct";
import { NavLink, Link } from "react-router-dom";
import Table from './Table'

import { Common } from "../Common/Common";
const Product = () => {
  const [products, setproducts] = useState([]);
  const [da, setda] = useState(true);
  const [addprod, setAddprod] = useState(false);
  useEffect(async () => {
    await axios.get(`http://localhost:3000/api/products`).then((res) => {
      if (res.data) {
        setproducts(res.data.data["products"]);
      }
    });
  }, [da]);

  const Delete = async (id) => {
    console.log(id);
    const data = { id: id };

    await axios
      .post(`http://localhost:3000/api/products/delete`, data)
      .then((res) => {
        if (res.data.data) {
          alert("item deleted");
          setda(!da);
        }
      });
  };

  const Edit = () => {};
  return (
    <>
      <div className="flex">
        <Common />
        <div className="mx-40">
          <div className="mt-20">
            <button
              onClick={() => setAddprod(!addprod)}
              class={
                addprod
                  ? "mx-5 mb-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  : "mx-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              }
            >
              {addprod ? "X" : "+ Add Products"}
            </button>
            <div className={addprod ? "" : "hidden"}>
              <AddProducts />
            </div>
            <Table/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
