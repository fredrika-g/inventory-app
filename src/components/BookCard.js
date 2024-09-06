function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-card__title">{book.title}</div>
      <p className="book-card__detail">
        <span className="book-card__label">Author:</span> {book.author}
      </p>
      <p className="book-card__detail">
        <span className="book-card__label">Genre:</span> {book.genre}
      </p>
    </div>
  );
}

export default BookCard
