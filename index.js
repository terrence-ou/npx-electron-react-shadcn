#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const prompts = require("prompts");
const chalk = require("chalk");
const {
  validateProjectName,
  writePackage,
  writeTheme,
} = require("./utils");

const repoUrl =
  "https://github.com/terrence-ou/electron-react-shadcn.git";

// Prompt questions
const initConfirmQuestion = {
  type: "text",
  name: "confirm",
  message:
    "This will create a project in the current directory. Continue? (Y/n)",
  initial: "Y",
  validate: (value) =>
    value.toLowerCase() === "y" || value.toLowerCase() === "n"
      ? true
      : "The input should be either y or n",
};

const questions = [
  {
    type: "text",
    name: "projectName",
    message: "Please enter your project name.",
    initial: "electron-react-shadcn",
    validate: (value) =>
      validateProjectName(value)
        ? true
        : "Please enter a valid project namel",
  },
  {
    type: "select",
    name: "theme",
    message: "Select a theme",
    choices: [
      { title: chalk.hex("#18181b")("Zinc"), value: "zinc" },
      { title: chalk.hex("#facc15")("Yellow"), value: "yellow" },
      { title: chalk.hex("#6d28d9")("Violet"), value: "violet" },
      { title: chalk.hex("#e11d48")("Rose"), value: "rose" },
      { title: chalk.hex("#f97316")("Orange"), value: "orange" },
      { title: chalk.hex("#16a34a")("Green"), value: "green" },
      { title: chalk.hex("#2563eb")("Blue"), value: "blue" },
    ],
  },
];

// Setting up project and clone the repo
async function cloneRepo() {
  try {
    // ask user to confirm creating the project in the current directory
    const { confirm } = await prompts(initConfirmQuestion);
    if (confirm.toLowerCase() != "y") {
      console.log("Initialization aborted.");
      return;
    }

    // Prompts for setting up the project
    const { projectName, theme } = await prompts(questions);

    // get project template
    console.log("Getting project template...");
    const targetDir = path.resolve(process.cwd(), projectName);
    await simpleGit().clone(repoUrl, targetDir);

    // Update package.json
    writePackage(targetDir, projectName);

    // Setup Theme
    const themeFilePath = path.join(
      targetDir,
      "src",
      "renderer",
      "src",
      "assets",
      "theme.css"
    );
    writeTheme(themeFilePath, theme);

    // remove .git folder
    fs.rm(`${targetDir}/.git`, { recursive: true }, (err) => {
      if (err)
        console.error("failed to remove .git folder. Error: ", err);
    });

    console.log(
      "Project setup complete, please use the following commands to continue:"
    );
    console.log(`\ncd ${[projectName]}`);
    console.log("npm install && npm run dev\n");
  } catch (error) {
    console.error(
      "Failed to get the project template. Error: ",
      error
    );
  }
}

function main() {
  cloneRepo();
}

main();
