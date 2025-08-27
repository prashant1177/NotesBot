import api from "../../api";

export default function FolderTools({ currFolder, projectid }) {
  const newFile = async (filename) => {
    await api.post(`/projects/newfile/${projectid}`, {
      currFolder,
      filename,
    });

    console.log(
      "File Created Successfully +   setLatex(res.data.fileContent);"
    );
  };

  const newFolder = async (foldername) => {
    console.log(foldername)
    await api.post(`/projects/newfolder/${projectid}`, {
      currFolder,
      foldername,
    });

    console.log(
      "File Created Successfully +   setLatex(res.data.fileContent);"
    );
  };
  return (
    <div className="w-full bg-gray-950 px-8 text-gray-300">
      <div className="flex items-center gap-8 text-gray-300 h-full">
        <button
          onClick={() => newFolder("newfolderthiisuniquw")}
          className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2"
        >
          New Folder
        </button>
        <button
          onClick={() => newFile("unique.tex")}
          className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2"
        >
          New File
        </button>
        <button className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
          Upload File
        </button>
        <button className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 p-2">
          Upload Image
        </button>
      </div>
    </div>
  );
}
