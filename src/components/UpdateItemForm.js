"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

import categories from "@/app/data/itemCategories";

function UpdateItemForm({id}) {


  const router = useRouter();
  const auth = useAuth();

  const [showMe, setShowMe] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const [itemId, setItemId] = useState(null)

  if(id){
    setShowMe(true)
  }

  async function handleUpdate(itemId) {
    e.preventDefault();
    setError("");

    console.log("ITEM ID FROM CARD: ",itemId)


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
    <div className={...showMe ? "max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md" : "hidden"}
   >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Item</h2>
      <form className="bg-white p-6 rounded-lg shadow" onSubmit={handleUpdate}>
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
            {categories &&
              categories.map((category) => {
                return <option value={category.name}>{category.name}</option>;
              })}
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        
          onClick={itemId => handleUpdate(item.id)}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateItemForm;
