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
  console.log(projectPath);
  // Create project folder
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

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
  return { message: "Project created", projectPath };
}

function createFile(parents, fileName) {
  const parentsPath = path.join(PROJECTS_DIR, parents);

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

  fs.writeFileSync(path.join(parentsPath, fileName), texTemplate);
  return { message: "File created", parentsPath };
}

function createFolder(parents, folderName) {
  const folderPath = path.join(PROJECTS_DIR, parents, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  } else {
    console.log("Folder Already Exists");
  }

  return { message: "Folder created", folderPath };
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

module.exports = { createFile, createFolder, createProject, openFile };
