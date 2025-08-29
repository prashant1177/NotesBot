import {
  NoteCard,
  NoteCardAbout,
  NoteCardHeader,
  NoteCardStats,
  NoteCardTitle,
} from "../../../ui/Card/Card";
import { Link } from "react-router-dom";
import { Eye,Heart,LibraryBig } from "lucide-react";

export default function ProjectList({projects, author}) {
return (
     <div className="mt-8 flex flex-col w-full pe-16">
      <h1 className="flex text-gray-900 mb-6 items-center gap-2 text-lg"><LibraryBig strokeWidth={1} size={20} /> Projects by {author.fullname}</h1>
      <div className="flex flex-col gap-8">
        {projects?.map((project) => (
          <NoteCard key={project._id}>
            <NoteCardHeader className="overflow-hidden">
              <Link to={`/project/${project._id}`}>
                {" "}
                <NoteCardTitle>{project.title}</NoteCardTitle>
              </Link>
              <NoteCardAbout>
                {project.about}
              </NoteCardAbout>
            </NoteCardHeader>
          <NoteCardStats className="flex flex-col items-end justify-baseline p-6 space-y-2 w-full flex-3/12">
          <span className="text-gray-500 flex items-center gap-2"> <Eye size={16} strokeWidth={2} /> {project.views}</span>
          <span className="text-gray-500 flex items-center gap-2"> <Heart size={16} strokeWidth={2} /> {project.like?.length}</span>
          </NoteCardStats>
          </NoteCard>
        ))}
      </div>
    </div>
)
}