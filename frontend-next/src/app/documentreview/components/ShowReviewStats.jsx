import React from "react";

function ShowReviewStats({ stats }) {
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4">
        {/* Word Count */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
          <p className="text-gray-600 text-sm mb-1">Word Count</p>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalWords.toLocaleString()}
          </p>
        </div>

        {/* Reading Time */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
          <p className="text-gray-600 text-sm mb-1">Reading Time</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.readingTimeMinutes}{" "}
            <span className="text-lg text-gray-500">min</span>
          </p>
        </div>

        {/* Reading Ease */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
          <p className="text-gray-600 text-sm mb-2">Reading Ease</p>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  stats.fleschReadingEase >= 60
                    ? "bg-green-500"
                    : stats.fleschReadingEase >= 30
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(stats.fleschReadingEase, 100)}%`,
                }}
              ></div>
            </div>
            <span className="text-lg font-bold text-blue-600">
              {stats.fleschReadingEase}/100
            </span>
          </div>
          <p className="text-xs text-gray-600 font-medium">
            {stats.fleschReadingEase >= 90
              ? "Very Easy"
              : stats.fleschReadingEase >= 80
              ? "Easy"
              : stats.fleschReadingEase >= 70
              ? "Fairly Easy"
              : stats.fleschReadingEase >= 60
              ? "Standard"
              : stats.fleschReadingEase >= 50
              ? "Fairly Difficult"
              : stats.fleschReadingEase >= 30
              ? "Difficult"
              : "Very Difficult"}
          </p>
        </div>

        {/* Grade Level */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
          <p className="text-gray-600 text-sm mb-2">Grade Level</p>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    (stats.fleschKincaidGrade / 18) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <span className="text-lg font-bold text-purple-600">
              {stats.fleschKincaidGrade}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-medium">
            Grade {Math.round(stats.fleschKincaidGrade)} reading level
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {/* Detailed Stats */}
        <div className="pt-4 border-t-2 border-gray-200">
          <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
            DETAILED STATS
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Pages</span>
              <span className="font-semibold text-gray-900">
                {stats.totalPages}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Paragraphs</span>
              <span className="font-semibold text-gray-900">
                {stats.totalParagraphs}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sentences</span>
              <span className="font-semibold text-gray-900">
                {stats.totalSentences}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Words/Sentence</span>
              <span className="font-semibold text-gray-900">
                {stats.avgWordsPerSentence}
              </span>
            </div>
          </div>
        </div>

        {/* Most Frequent Words */}
        {stats.mostFrequentWords && stats.mostFrequentWords.length > 0 && (
          <div className="pt-4 border-t-2 border-gray-200">
            <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
              TOP WORDS
            </h3>
            <div className="space-y-2">
              {stats.mostFrequentWords.slice(0, 5).map((word, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${
                          (word[1] / stats.mostFrequentWords[0][1]) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-700 font-medium w-20 text-right">
                    {word[0]} ({word[1]})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowReviewStats;
