'use client';

import { useState, useEffect } from 'react';
import { Post, LocalPost } from '@/types';
import PostCard from './PostCard';
import AddPostForm from './AddPostForm';
import Pagination from './Pagination';
import { useStore } from '@/store/useStore';

interface UserPostsProps {
  userId: number;
  initialPosts: Post[];
}

export default function UserPosts({ userId, initialPosts }: UserPostsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [apiIsLoading, setApiIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const setPosts = useStore((state) => state.setPosts);
  const loadLocalPosts = useStore((state) => state.loadLocalPosts);
  
  const localPosts = loadLocalPosts(userId);
  const allPosts: LocalPost[] = [...initialPosts, ...localPosts].sort((a, b) => b.id - a.id);
  
  const postsPerPage = 5;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);
  
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);
  
  const handlePostAdded = () => {
    setRefreshKey(prev => prev + 1);
    setCurrentPage(1);
  };
  
  if (apiIsLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading posts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-2">⚠️ Something went wrong</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div key={refreshKey}>
      <AddPostForm userId={userId} onPostAdded={handlePostAdded} />
      
      <h3 className="text-xl font-semibold mb-4">
        Posts ({allPosts.length})
      </h3>
      
      {currentPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts yet. Create your first post above!
        </div>
      ) : (
        <>
          {currentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}