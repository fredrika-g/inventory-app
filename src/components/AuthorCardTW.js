import Link from "next/link";

export default function AuthorCard(props) {
  const { author } = props;
  return (
    <Link href={`/authors/${author.id}`}>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm text-gray-800">
        <p className="font-bold text-lg">{author.name}</p>
        <p className="text-sm text-gray-600 italic">{author.yearOfBirth}</p>
      </div>
    </Link>
  );
}
