import {
  NoteCard,
  NoteCardAbout,
  NoteCardHeader,
  NoteCardStats,
  NoteCardTitle,
} from "../../../ui/Card/Card";
import { Link } from "react-router-dom";
import { Eye, Heart, LibraryBig } from "lucide-react";

export default function ProjectList({ projects, author }) {
  return (
    <div className="mt-8 flex flex-col w-full pe-16">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <LibraryBig strokeWidth={1} size={24} /> Projects by {author.fullname}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <NoteCard
            key={project._id}
            className=""
          >
            <NoteCardHeader className="overflow-hidden">
              <Link to={`/project/${project._id}`}>
                {" "}
                <NoteCardTitle>{project.title.slice(0, 60)}</NoteCardTitle>
              </Link>
              <NoteCardAbout>{project.about.slice(0, 180)}</NoteCardAbout>
            </NoteCardHeader>
          </NoteCard>
        ))}
      </div>
    </div>
  );
}
