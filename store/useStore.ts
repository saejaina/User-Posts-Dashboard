import { create } from 'zustand';
import { User, Post, LocalPost } from '@/types';

interface StoreState {
  users: User[];
  posts: Post[];
  localPosts: LocalPost[];
  setUsers: (users: User[]) => void;
  setPosts: (posts: Post[]) => void;
  addLocalPost: (post: LocalPost) => void;
  loadLocalPosts: (userId: number) => LocalPost[];
}

export const useStore = create<StoreState>((set, get) => ({
  users: [],
  posts: [],
  localPosts: [],
  
  setUsers: (users) => set({ users }),
  
  setPosts: (posts) => set({ posts }),
  
  addLocalPost: (post) => {
    const { localPosts } = get();
    const updatedLocalPosts = [...localPosts, post];
    set({ localPosts: updatedLocalPosts });
    
    localStorage.setItem('localPosts', JSON.stringify(updatedLocalPosts));
  },
  
  loadLocalPosts: (userId) => {
    const { localPosts } = get();
    return localPosts.filter(post => post.userId === userId);
  },
}));

if (typeof window !== 'undefined') {
  const savedPosts = localStorage.getItem('localPosts');
  if (savedPosts) {
    useStore.setState({ localPosts: JSON.parse(savedPosts) });
  }
}