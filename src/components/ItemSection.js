import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

function ItemSection({ items }) {
  return (
    <div className="flex justify-center align-center">
      <ItemForm></ItemForm>

      <section className="flex flex-col items-center justify-start px-8 max-w-lg mx-auto gap-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Items</h2>
        {items &&
          items.map((item) => {
            return <ItemCard key={item.id} item={item}></ItemCard>;
          })}
      </section>
    </div>
  );
}
export default ItemSection;
