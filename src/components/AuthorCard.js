import Link from "next/link";

export default function AuthorCard(props) {
  const { author } = props;
  return (
    <Link href={`/authors/${author.id}`}>
      <div className="author-card">
        <p className="author-card__name">{author.name}</p>
        <p className="author-card__year-of-birth">{author.yearOfBirth}</p>
      </div>
    </Link>
  );
}
