#! /usr/bin/env node

const simpleGit = require("simple-git");
const path = require("path");

const repoUrl = "https://github.com/terrence-ou/electron-react-shadcn.git";
const targetFolderName = "electron-react-shadcn";
const targetDir = path.resolve(process.cwd(), process.argv[2] || targetFolderName);

console.log("Creating electron app in: ", targetDir);

async function cloneRepo() {
    try {
        console.log("Getting project setup...");
        await simpleGit().clone(repoUrl, targetDir);
    } catch (error) {
        console.error("Failed to get project template. Error: ", error);
    }
}

cloneRepo();

