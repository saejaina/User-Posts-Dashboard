import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '@/store/useStore';

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  body: z.string().min(10, 'Body must be at least 10 characters'),
});

type PostFormData = z.infer<typeof postSchema>;

interface AddPostFormProps {
  userId: number;
  onPostAdded: () => void;
}

export default function AddPostForm({ userId, onPostAdded }: AddPostFormProps) {
  const addLocalPost = useStore((state) => state.addLocalPost);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    const newPost = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      userId,
      title: data.title,
      body: data.body,
      isLocal: true,
    };
    
    addLocalPost(newPost);
    reset();
    onPostAdded();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New Post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            {...register('title')}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Body</label>
          <textarea
            {...register('body')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post content"
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300"
        >
          {isSubmitting ? 'Adding...' : 'Add Post'}
        </button>
      </form>
    </div>
  );
}