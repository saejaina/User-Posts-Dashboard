'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useStore } from '@/store/useStore';

interface UserListProps {
  initialUsers: User[];
}

export default function UserList({ initialUsers }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUsers = useStore((state) => state.setUsers);
  
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);
  
  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (apiIsLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  
  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your search.
        </div>
      )}
    </>
  );
}