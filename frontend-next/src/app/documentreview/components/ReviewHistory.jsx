export default function ReviewHistory({ reviews, handleShowHistory }) {
  return (
    <div className="mb-16  px-4">
      <h5 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
        Review History
      </h5>
      <ul className="flex flex-col gap-2 ">
        {reviews &&
          reviews.map((review, i) => (
            <button
              onClick={() => handleShowHistory(review)}
              key={i}
              className="text-left rounded transition-all duration-300 group cursor-pointer border-b-1 border-gray-200  py-2 hover:border-blue-600"
            >
              <span className="text-xl font-light text-gray-700 group-hover:text-blue-600 transition-colors duration-200 ">
                {review.title}
              </span>
            </button>
          ))}
      </ul>
      {!reviews && <p className="italic text-center">Nothing to show here</p>}
    </div>
  );
}
