import { fetchUsers } from '@/services/api';
import UserList from '@/components/UserList';

export default async function HomePage() {
  const users = await fetchUsers();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-8">Users Dashboard</h1>
      <UserList initialUsers={users} />
    </div>
  );
}