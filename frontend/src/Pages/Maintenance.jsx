export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">🚧 Site Under Maintenance 🚧</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are currently undergoing maintenance. Please check back later.
        </p>
        <p className="text-lg text-gray-600 mb-6">
         Reason: We are changing our server location to improve performance and ensure faster loading times for all users.
        </p>
      </div>
    </div>
  );
}