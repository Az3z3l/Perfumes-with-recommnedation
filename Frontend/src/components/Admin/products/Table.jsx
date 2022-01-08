import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProducts from "./EditProd";
import { NavLink, Link } from "react-router-dom";


const Table = () => {
  const [products, setproducts] = useState([]);
  const [da, setda] = useState(true);
  const [editprod, setEditProd] = useState(false);
  const [passprops, setpassprops] = useState(null);

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

  const Edit = (i) => {
    setEditProd(true)
    setpassprops(i);
  };

    return editprod?(
          <AddProducts 
    passprops={passprops}
    setEditProd={setEditProd}
    editprod={editprod}
    setda={setda}
    da={da}
    />
    ):(
      <>
            <div className={editprod ? "hidden" : "flex flex-col mx-5"}>
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
                            Title
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
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
                                    src={
                                      i["images"][0]?.src
                                        ? i["images"][0]?.src
                                        : i.images[0]
                                    }
                                    alt=""
                                  />
                                </div>
                                <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">
                                    {i.name}
                                  </div>
                                  <div class="text-sm text-gray-500">
                                    {i.category}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">
                                {i.description.substring(0, 60)}
                              </div>
                              <div class="text-sm text-gray-500">
                                {i.description.substring(60, 90)}
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              (
                              {i.status != 0 ? (
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Avaliable
                                </span>
                              ) : (
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Not-Avaliable
                                </span>
                              )}
                              )
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {i.price}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                class="text-indigo-600 hover:text-indigo-900"
                                onClick={()=>Edit(i)}
                              >
                                Edit
                              </a>
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
            </>
    )
}

export default Table
