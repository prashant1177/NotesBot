export default function ProjectViewSidebar({ project }) {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col space-y-6 p-6">
        {/* Description Section */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900 uppercase tracking-wide">
            Description
          </h2>
          <div>
            {project.about ? (
              <p className="text-gray-700 leading-relaxed">{project.about}</p>
            ) : (
              <p className="text-gray-400 italic">No description provided</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>
        
        {/* Topics Section */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900 uppercase tracking-wide">
            Topics
          </h2>
          {project.topics && project.topics.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No topics assigned</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>
        
        {/* Owner Section */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900 uppercase tracking-wide">
            Project Owner
          </h2>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500  rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {project.owner.fullname?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{project.owner.fullname}</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}