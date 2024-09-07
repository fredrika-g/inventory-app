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
        description,
        quantity,
        category,
      }),
    });

    if (response.ok && response.status != 400) {
      const data = await response.json();

      console.log("data", data);
      return;
    }

    if (response.status == 400) {
      console.log(response);
      setError("Bad request");
    }
  }

  return (
    <div>
      ItemForm
      <form className="form bg-white" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Name</label>
          <input
            className="form__input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Description</label>
          <input
            className="form__input"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Quantity</label>
          <input
            className="form__input"
            type="text"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Category</label>
          <input
            className="form__input"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          ></input>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="form__button form__button--primary">
          Add item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
