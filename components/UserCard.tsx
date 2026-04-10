import { User } from '@/types';
import Link from 'next/link';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="border rounded-lg p-7 shadow-sm hover:shadow-lg transition-shadow border-blue-800">
      <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
      <p className="text-black text-sm mb-1">
        <span className="font-medium">Email:</span> {user.email}
      </p>
      <p className="text-black text-sm mb-3">
        <span className="font-medium">Company:</span> {user.company.name}
      </p>
      <Link
        href={`/users/${user.id}`}
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
      >
        View Posts
      </Link>
    </div>
  );
}