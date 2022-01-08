import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import {Common} from '../Common/Common'

const Customer = () => {
  const [products, setproducts] = useState([]);
  const [da, setda] = useState(true);
  const [addprod, setAddprod] = useState(false);
  useEffect(async () => {
    await axios
      .get(`http://localhost:3000/api/authentication/userdetails`)
      .then((res) => {
        if (res.data) {
          console.log(res.data.data.products);
          setproducts(res.data.data.products);
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

  return (<>    <div className="flex">
      <Common/>
    <div className="mt-20 mx-40">
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
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DOJ
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
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
                              src={i?.src}
                              alt=""
                            />
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                              {i.username}
                            </div>
                            <div class="text-sm text-gray-500">{i.email}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Date(1631464901473)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          class="text-indigo-600 hover:text-indigo-900"
                          onClick={() => Delete(1)}
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
    </div>    </div>
    </>
  );
};

export default Customer;
