"use client";
import { useAuth } from "../context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header className="flex items-center justify-between bg-green-900 p-4">
      <h1 className="text-3xl font-bold text-slate-100 ml-4">Inventory</h1>
      {auth.token ? (
        <Link
          href="/"
          onClick={auth.logout}
          className="text-sm text-black bg-slate-100 hover:bg-slate-300 px-4 py-2 rounded-md transition"
        >
          Logout
        </Link>
      ) : (
        <Link
          href="/"
          className="text-sm text-black bg-slate-100 hover:bg-slate-300 px-4 py-2 rounded-md transition"
        >
          Login
        </Link>
      )}
    </header>
  );
}
export default Header;
