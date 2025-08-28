const fspromises = require("fs").promises;
const fs = require("fs");

const path = require("path");

// Base folder to store projects
const PROJECTS_DIR = path.join(__dirname, "../../database");

function createProject(user, projectName) {
  const userPath = path.join(PROJECTS_DIR, user);
  const projectPath = path.join(userPath, projectName);

  console.log(userPath);
  if (!fs.existsSync(userPath)) {
    fs.mkdirSync(userPath);
  }
  // Create project folder
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  console.log(projectPath);
  // Create default main.tex
  const texTemplate = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{My New Project}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

Hello, world! This is a new LaTeX project.

\\end{document}
`;

  fs.writeFileSync(path.join(projectPath, "main.tex"), texTemplate);
  return { message: "Project created" };
}

function createFile(username, folderpath, fileName) {
  const parentsPath = path.join(PROJECTS_DIR, username, folderpath);
  console.log(parentsPath);
  // Create default main.tex
  const texTemplate = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{My New Project}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

Hello, world! This is a ${fileName} LaTeX File.

\\end{document}
`;

  fs.writeFileSync(path.join(parentsPath, fileName), texTemplate);
  return { message: "File created" };
}

function createFolder(user, parents, folderName) {
  const folderPath = path.join(PROJECTS_DIR, user, parents, folderName);
  console.log(folderPath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  } else {
    console.log("Folder Already Exists");
  }

  return { message: "Folder created" };
}

async function openFile(file) {
  const filePath = path.join(PROJECTS_DIR, file);
  if (!fs.existsSync(filePath)) {
    return { message: "File Does Not Exists" };
  } else {
    const fileContent = await fspromises.readFile(filePath, "utf8");
    return fileContent;
  }
}

async function saveFile(user, folder, file, latex) {
  try {
    const filePath = path.join(PROJECTS_DIR,user, folder, file);

    console.log(filePath);
    // Ensure parent directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      return { message: "Directory does not exist" };
    }
    // Write content to file
    await fspromises.writeFile(filePath, latex, "utf8");

    return { message: "File saved successfully" };
  } catch (err) {
    console.error("Error saving file:", err);
    return { message: "Error saving file", error: err };
  }
}

module.exports = {
  createFile,
  createFolder,
  createProject,
  openFile,
  saveFile,
};
