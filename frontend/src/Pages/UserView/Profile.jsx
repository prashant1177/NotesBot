import Button from "../../ui/Button/Button";
export default function Profile({ author, notes }) {
  console.log(author);
  return (
    <div className=" w-full mt-8 p-4">
      <div className="flex flex-col space-y-8">
        <div>
          {" "}
          <h1 className="text-2xl font-medium mb-1 text-gray-900">{author.fullname}</h1>
          <h1 className="text-gray-600">This is the about text, that user will add</h1>
        </div>
        <div className="flex gap-2 border-b-1 border-gray-400 pb-4">
           <Button  varient="muted" className="flex-1 border-1 border-gray-300">Follow</Button>{" "}
       <Button  varient="muted" className="flex justify-center items-center gap-1 flex-1 border-1 border-gray-300">Sponser</Button> </div>
        <div>
            
          <h1 className="text-lg mb-4">Interested Topics</h1>
          <div className="flex flex-wrap gap-2">
            <h1 className="px-2 text-blue-800 rounded-md border-1 border-blue-200  bg-blue-100 w-fit h-fit">
              Engineering
            </h1>
            <h1 className="px-2 text-blue-800 rounded-md border-1 border-blue-200  bg-blue-100 w-fit h-fit">
              Examples
            </h1>

            <h1 className="px-2 text-blue-800 rounded-md border-1 border-blue-200  bg-blue-100 w-fit h-fit">
              Tobe Added
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
