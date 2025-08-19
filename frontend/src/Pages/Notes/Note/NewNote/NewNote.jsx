import Input from "../../../../ui/Input/Input";
import TextArea from "../../../../ui/Input/TextArea";

export default function NewNote() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full p-4">
      <div className="w-3/6 flex flex-col space-y-8 p-6 rounded-lg mt-32">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Note</h1>
        <div>
          <label className="text-gray-900 block mb-2 text-sm font-medium">Title</label>
          <Input varient="transparent"/>
        </div>
        <div>
          <label className="text-gray-900 block mb-2 text-sm font-medium">Description</label>
          <TextArea rows="8" varient="transparent"/>
        </div>
        <div className="flex items-center justify-center space-x-2">
        <label className="text-gray-900  mb-2 text-sm font-medium">Do you want make it private </label>
        <input type="checkbox" className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500" />
     </div> </div>
    </div>
  );
}
