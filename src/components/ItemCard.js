"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function ItemCard({ item }) {
  const router = useRouter();
  const auth = useAuth();
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log("Couldn't delete item", error));

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log("An error occured", error.message);
    }
  };
  return (
    <div className="py-4 px-6 bg-white rounded-lg shadow-md max-w-lg min-w-full hover:cursor-pointer">
      <div className="text-xl font-semibold text-gray-800">{item.name}</div>

      <div className="flex gap-6">
        <div className="flex flex-col">
          <p className="mt-2 text-gray-600">
            <span className="font-medium text-gray-700">Quantity:</span>{" "}
            {item.quantity}
          </p>
          <p className="mt-1 text-gray-600">
            <span className="font-medium text-gray-700">Category:</span>{" "}
            {item.category}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="mt-2 text-gray-600">
            <span className="font-medium text-gray-700">Description:</span>{" "}
            {item.description}
          </p>
        </div>

        <div className="flex flex-col">
          <button
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
            onClick={(itemId) => handleDelete(item.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
