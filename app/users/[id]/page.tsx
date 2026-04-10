import { fetchPosts, fetchUsers } from '@/services/api';
import UserPosts from '@/components/UserPosts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPostsPage({ params }: PageProps) {
  const { id } = await params;
  const userId = parseInt(id);
  
  if (isNaN(userId)) {
    notFound();
  }
  
  const users = await fetchUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    notFound();
  }
  
  const apiPosts = await fetchPosts(userId);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{user.name}&apos;s Posts</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <UserPosts userId={userId} initialPosts={apiPosts} />
    </div>
  );
}