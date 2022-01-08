import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { Common } from "../Common/Common";

const Token = () => {
  const [products, setproducts] = useState();
  const [da, setda] = useState(true);
  const [addprod, setAddprod] = useState(false);
  const [items, setitems] = useState([]);

  useEffect(() => {
    console.log(items);
  }, [da])

  useEffect(async () => {
    await axios
      .get(`http://localhost:3000/api/orders/getOrders`)
      .then((res) => {
        console.log(res.data.data.product);
        if (res.data) {
          setproducts(res.data.data.product);
        }
      });
  }, []);

  return (
    <>
      <div className="flex">
        <Common />
        <div className="mt-20 ml-40  mx-auto">
          <span className="text-4xl "> Recent Orders </span>
          <div className={addprod ? "hidden" : "flex flex-col mx-5"}>
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User Email
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Products
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Bought On
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {products?.map((i, j) => (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10">
                                <img
                                  class="h-10 w-10 rounded-full"
                                  src="https://thumbs.dreamstime.com/z/discount-stamp-vector-clip-art-33305813.jpg"
                                  alt=""
                                />
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {i.email}
                                </div>
                                <div class="text-sm text-gray-500"></div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                            {i.products.length}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {new Date(i.created).toString()}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {i.totalCost}
                          </td>
                          <td>
                          <button onClick={()=>{setitems(i.products);setda(!da)}}> View Prod</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="container mt-auto bg-blue-100 h-screen w-80 text-black overflow-y">
            <div className="py-auto">
            Overview
                {items.map((i,j)=>(
                  <>
                    <div className="mt-10 ml-5 font-bold">
                      {i.name}
                    </div>
                    <img src={i.image} width="50%" height="50%" className="ml-10"/>
                    <div className="ml-20 font-bold">
                    {i.qty}
                    </div>
                    </>
                ))}
            </div>
         </div>
      </div>
    </>
  );
};

export default Token;
