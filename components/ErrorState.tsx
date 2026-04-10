interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center py-8">
      <div className="text-red-500 text-lg mb-2">⚠️ Something went wrong</div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}