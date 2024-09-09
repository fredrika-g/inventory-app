"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function ItemForm() {
  const router = useRouter();
  const auth = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

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
    });

    if (response.ok && response.status != 400) {
      const data = await response.json();

      console.log("data", data);
      router.refresh();
      return;
    }

    if (response.status == 400) {
      console.log(response);
      setError("Bad request");
    }

    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
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
            type="text"
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
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
