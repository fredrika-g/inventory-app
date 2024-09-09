import ItemForm from "@/components/ItemForm";
import ItemCard from "@/components/ItemCard";
import UpdateItemForm from "@/components/UpdateItemForm";

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
      <div className="flex justify-center align-center">
        <ItemForm></ItemForm>
        <UpdateItemForm></UpdateItemForm>
        <section className="flex flex-col items-center justify-start px-8 max-w-lg mx-auto gap-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Items</h2>
          {items &&
            items.map((item) => {
              return <ItemCard key={item.id} item={item}></ItemCard>;
            })}
        </section>
      </div>
    </main>
  );
}
