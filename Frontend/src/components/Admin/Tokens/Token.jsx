import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToken from "./AddTokens";
import { NavLink, Link } from "react-router-dom";
import {Common} from '../Common/Common'

const Token = () => {

  const [products, setproducts] = useState([]);
  const [da, setda] = useState(true);
  const [addprod, setAddprod] = useState(false);
  useEffect(async () => {
    await axios.get(`http://localhost:3000/api/tokens/gettoken`).then((res) => {
      if (res.data) {
        setproducts(res.data.data["products"]);
      }
    });
  }, [da]);

  const Delete = async (id) => {
    console.log(id);
    const data = { id: id };

    await axios
      .post(`http://localhost:3000/api/tokens/deletetoken`, data)
      .then((res) => {
        if (res.data.data) {
          alert("item deleted");
          setda(!da);
        }
      });
  };


    return (
    <>
<div className="flex">
      <Common/>
      <div className="mt-20 mx-40">
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
          <AddToken />
        </div>

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
                        Token-Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Discount
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {products.map((i, j) => (
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
                                {i.tokenid}
                              </div>
                              <div class="text-sm text-gray-500">
                                {i.price}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        {i.price}%
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            class="text-indigo-600 hover:text-indigo-900"
                            onClick={() => Delete(i._id)}
                          >
                            Delete
                          </a>
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
      </div>
    </>
    )
}

export default Token
