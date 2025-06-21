export default function Main() {
  return (
      <main className="container max-w-4xl mx-auto flex justify-center items-center py-20">
        <div className="bg-white/50 backdrop-blur-lg p-10 rounded-2xl shadow-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">What's on you mind...</h1>
          <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Enter Text"
              className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button className="bg-purple-600 text-white px-6 py-2">Upload PDF</button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="px-5 py-2 border border-purple-500 rounded-full text-purple-700 hover:bg-purple-100">
              Summary
            </button>
            <button className="px-5 py-2 border border-purple-500 rounded-full text-purple-700 hover:bg-purple-100">
              Questions
            </button>
            <button className="px-5 py-2 border border-purple-500 rounded-full text-purple-700 hover:bg-purple-100">
              Bullets
            </button>
            <button className="px-5 py-2 border border-purple-500 rounded-full text-purple-700 hover:bg-purple-100">
              Organize
            </button>
          </div>
        </div>
      </main>
  );
}