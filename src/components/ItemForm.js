"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

import categories from "@/app/data/itemCategories";

function ItemForm({ items }) {
  const router = useRouter();
  const auth = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const [itemsList, setItemsList] = useState(items);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const url = "/api/items";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name,
        description: description ? description : null,
        quantity,
        category,
      }),
      cache: "no-cache",
    });

    if (response.ok && response.status !== 400) {
      const newItem = await response.json();

      setName("");
      setDescription("");
      setQuantity("0");
      setCategory("");

      router.refresh();
    }

    if (response.status === 400) {
      const body = await response.json();
      setError(body.error);
    }
  }

  return (
    <div className="h-fit w-72 mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Item Form</h2>
      <form className="bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option disabled value="">
              Choose category
            </option>
            {categories &&
              categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>

        {error && <p className="text-red-500 mb-4 w-full">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Add item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
