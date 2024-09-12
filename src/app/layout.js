import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/auth";
import Head from "@/components/Head";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory App",
  description: "An Inventory App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-50`}>
        <AuthProvider>
          <Head></Head>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
