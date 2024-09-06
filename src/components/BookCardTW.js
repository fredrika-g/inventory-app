function BookCard({ book }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="font-bold text-xl mb-2">{book.title}</div>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Author:</span> {book.author}
      </p>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Genre:</span> {book.genre}
      </p>
    </div>
  );
}

export default BookCard
