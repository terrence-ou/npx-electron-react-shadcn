#! /usr/bin/env node

const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const repoUrl = "https://github.com/terrence-ou/electron-react-shadcn.git";
const targetFolderName = process.argv[2] || "electron-react-shadcn";
const targetDir = path.resolve(process.cwd(), targetFolderName);

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLocaleLowerCase() || "y");
    })
  );
}

async function cloneRepo() {
  try {
    // ask user to confirm creating the project in the current directory
    const confirm = await prompt(
      "This will create a project in the current directory. Continue? (Y/n)"
    );
    if (confirm !== "y") {
      console.log("Process aborted");
      return;
    }
    console.log("Creating electron app in: ", targetDir);

    // get project template
    console.log("Getting project template...");
    await simpleGit().clone(repoUrl, targetDir);
    // remove .git folder
    fs.rm(`${targetDir}/.git`, { recursive: true }, (err) => {
      if (err) console.error("failed to remove .git folder. Error: ", err);
    });
    console.log(
      "Project setup complete, please use the following commands to continue:"
    );
    console.log(`\ncd ${targetFolderName}`);
    console.log("npm install && npm run dev\n");
  } catch (error) {
    console.error("Failed to get the project template. Error: ", error);
  }
}

function main() {
  cloneRepo();
}

main();
