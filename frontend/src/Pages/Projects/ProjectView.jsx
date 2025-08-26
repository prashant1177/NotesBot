import { FileType2, Folder, LetterText, LibraryBig } from "lucide-react";
import Button from "../../ui/Button/Button";

export default function ProjectView() {
  return (
    <div className="">
      <div className="flex justify-between p-4 px-8 bg-gray-100">
        <div className="flex items-center gap-8">
          <h1>Project</h1>
          <h1>Issues</h1>
          <h1>Contribution Requests</h1>
          <h1>Approvals</h1>
        </div>
        <div>
          <Button>Fork This</Button>
        </div>
      </div>
      <div className="mt-8 flex w-full px-8">
        <div className="flex-3/4 flex flex-col w-full">
          <div className=" text-gray-900 pb-2  border-b-8 border-gray-100">
            <h1 className="flex text-gray-800 mb-2 items-center gap-2 text-2xl">
              <LibraryBig strokeWidth={1} size={20} /> This will be the title of
              the paper
            </h1>
            <div className="flex justify-between gap-4 pe-8">
              <h1>Project files listed below</h1>
              <div className="flex gap-4">
              <h1>Version 0.1</h1>
              <h1>Last Changed 26-08-2025</h1></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"><Folder size={16} />Reference</h1>
            <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"><FileType2 size={16} />Filename.txt</h1>
            <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"><FileType2 size={16} />Filename.txt</h1>
            <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"><FileType2 size={16} />Filename.txt</h1>
            <h1 className="border-b-2 border-gray-200 p-2 flex gap-2 items-center"><FileType2 size={16} />Filename.txt</h1>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-1/4">
          <div className="w-full p-4">
            <div className="flex flex-col">
              <div className="border-b-1 border-gray-100 py-4">
                <h1 className="text-lg text-gray-900">About</h1>
              </div>
              <h1 className="text-lg my-4">Topics </h1>
              <h1 className="text-lg my-4">Original </h1>
              <h1 className="text-lg my-4">Members </h1>
              <h1 className="text-lg my-4">Contributer </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
