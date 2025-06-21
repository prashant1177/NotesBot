export default function Recent() {
  return (
    <div className="mt-10 bg-white/60 backdrop-blur-md shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Results
      </h2>
      <ul className="space-y-4">
        {/* Replace below <li> with dynamic content later */}
        <li className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
          <h3 className="font-medium text-purple-700">
            How AI is changing education
          </h3>
          <p className="text-sm text-gray-600">
            Summary created 2 mins ago • 124 words
          </p>
        </li>
        <li className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">
          <h3 className="font-medium text-purple-700">
            Introduction to Machine Learning
          </h3>
          <p className="text-sm text-gray-600">
            Questions generated 5 mins ago • 8 items
          </p>
        </li>
      </ul>
    </div>
  );
}
