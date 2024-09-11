import ItemSection from "@/components/ItemSection";

export default async function Home() {
  const items = await fetch("http://localhost:3000/api/items", {
    cache: "no-cache",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Failed to get items", error);
    });

  return (
    <main className="min-h-screen w-full py-6">
      <ItemSection initialItems={items}></ItemSection>
    </main>
  );
}
