import { LocalPost } from '@/types';

interface PostCardProps {
  post: LocalPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
      <p className="text-black">{post.body}</p>
      {post.isLocal && (
        <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Local Post
        </span>
      )}
    </div>
  );
}