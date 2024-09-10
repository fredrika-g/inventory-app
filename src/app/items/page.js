import ItemForm from "@/components/ItemForm";
import ItemCard from "@/components/ItemCard";
import UpdateItemForm from "@/components/UpdateItemForm";

import ItemSection from "@/components/ItemSection";

export default async function Home() {
  const items = await fetch("http:localhost:3000/api/items", {
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Failed to get items", error);
    });

  return (
    <main className="min-h-screen w-full py-6">
      <ItemSection items={items}></ItemSection>
    </main>
  );
}
