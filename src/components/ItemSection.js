"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

import categories from "@/app/data/itemCategories";

function ItemSection({ initialItems }) {
  const auth = useAuth();

  const [items, setItems] = useState(initialItems);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockFilter, setInStockFilter] = useState("all");

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prevSelectedCategories) => {
      // Om kategorin redan finns i listan, ta bort den
      if (prevSelectedCategories.includes(categoryName)) {
        return prevSelectedCategories.filter(
          (catName) => catName != categoryName
        );
      }
      // Annars, lägg till den i listan
      return [...prevSelectedCategories, categoryName];
    });
  };

  // fetching items based on chosen categories
  useEffect(() => {
    const fetchFilteredItems = async () => {
      const res = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ categories: selectedCategories }),
      });
      const data = await res.json();
      setItems(data); // Uppdatera items baserat på API-svaret
    };

    // if categories are chosen, fetch data
    if (selectedCategories.length > 0) {
      fetchFilteredItems();
    } else {
      setItems(initialItems); // if no categories are chosen, set items array to initial item data
    }
    // run again if categories are chosen
  }, [selectedCategories]);

  const handleInStockChange = (e) => {
    setInStockFilter(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    // filter by availablity (quantity)
    let inStockMatch = true; // default if the "both" option is chosen
    if (inStockFilter === "inStock") {
      inStockMatch = item.quantity > 0;
    } else if (inStockFilter === "outOfStock") {
      inStockMatch = item.quantity === 0;
    } else {
      inStockMatch = true;
    }

    // Return as either true or false
    return inStockMatch;
  });

  return (
    <div className="flex justify-center align-center">
      <ItemForm></ItemForm>

      <section className="flex flex-col items-center justify-start px-8 max-w-lg mx-auto gap-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Items</h2>

        <div className="mb-4">
          <h3 className="mr-2 text-gray-700">Filter by category:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="mr-2"
                  id={`checkbox${category.id}`}
                />
                <label htmlFor={`checkbox${category.id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-4">
          <h3 className="mr-2 text-gray-700">In stock:</h3>
          <div className="flex gap-4">
            <div className="flex gap-1">
              <input
                type="radio"
                name="stockRadio"
                value="inStock"
                id="inStock"
                checked={inStockFilter === "inStock"}
                onChange={handleInStockChange}
              ></input>
              <label htmlFor="inStock">Yes</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="stockRadio"
                value="outOfStock"
                id="outOfStock"
                checked={inStockFilter === "outOfStock"}
                onChange={handleInStockChange}
              ></input>
              <label htmlFor="outOfStock">No</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="stockRadio"
                value="all"
                id="bothStockRadio"
                checked={inStockFilter === "all"}
                onChange={handleInStockChange}
              ></input>
              <label htmlFor="bothStockRadio">Both</label>
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            return <ItemCard key={item.id} item={item}></ItemCard>;
          })
        ) : (
          <p className="text-gray-600">No items match the selected criteria.</p>
        )}
      </section>
    </div>
  );
}
export default ItemSection;
