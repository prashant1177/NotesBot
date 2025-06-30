import { useEffect, useState } from "react";

export default function Recent() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchRecentResults = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/recent`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Failed to fetch recent results");
        }
      } catch (error) {
        console.error("Error fetching recent results:", error);
      }
    };

    fetchRecentResults();
  }, []);

  return (
    <div className="min-h-screen p-6 w-full mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Results
      </h2>
      <ul className="space-y-4">
        {results.length > 0 ? (
          results.map((item, index) => (
            <li
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition"
            >
              <h3 className="font-medium text-purple-700">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.selected_option} •{" "}
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Source
                </a>
              </p>
              <details className="mt-2 text-sm text-gray-700">
                <summary className="cursor-pointer text-purple-600">View Response</summary>
                <pre className="mt-2 whitespace-pre-wrap">{item.response}</pre>
              </details>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No recent results available.</li>
        )}
      </ul>
    </div>
  );
}
