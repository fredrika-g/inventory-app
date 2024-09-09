import ItemForm from "@/components/ItemForm";
import ItemCard from "@/components/ItemCard";

export default async function Home() {
  const items = await fetch("http:localhost:3000/api/items", {
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Failed to get items", error);
    });

  return (
    <main className="min-h-screen w-full">
      <ItemForm></ItemForm>
      <section className="flex flex-col items-center justify-between px-8 max-w-lg mx-auto gap-6">
        {items &&
          items.map((item) => {
            return <ItemCard key={item.id} item={item}></ItemCard>;
          })}
      </section>
    </main>
  );
}
