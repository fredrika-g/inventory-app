"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("123@mail.com");
  const [password, setPassword] = useState("123abc");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name: !name ? "" : name,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      console.log("data", data);
      localStorage.setItem("@inventory/token", data.token);
      auth.setToken(data.token);
      router.push("/items");
      return;
    }
    setError("Invalid login credentials");
  }

  console.log("Auth", auth);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Email</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Password</label>
          <input
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isLogin && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Name</label>
            <input
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-800 transition-colors">
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center text-gray-500 mt-4">...or</p>

        <button
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {!isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
