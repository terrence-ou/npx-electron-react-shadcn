const fs = require("fs");
const path = require("path");

const packageNameRegex =
  /^(?!.*[ _!@#$%^&*()+=~`|\\:;"'<>,?])[a-z0-9-_.]{1,214}$|^@[a-z0-9-_.]+\/[a-z0-9-_.]{1,214}$/;

// Ensure the project name is npm-compatible
const validateProjectName = (projectName) =>
  packageNameRegex.test(projectName);

// Overwrite the theme.css file
const writeTheme = (projThemeDir, theme) => {
  const themeFilePath = path.join(
    __dirname,
    "themes",
    `${theme}.css`
  );
  try {
    const themeContent = fs.readFileSync(themeFilePath, "utf-8");
    fs.writeFileSync(projThemeDir, themeContent, "utf-8");
    console.log("theme.css created");
  } catch (error) {
    console.error(
      "Failed to create theme.css file. [ERROR]: ",
      error
    );
  }
};

// Overwrite package.json configuration
const writePackage = async (targetDir, packageName) => {
  const packageJsonPath = path.join(targetDir, "package.json");
  try {
    // Read file
    const data = fs.readFileSync(packageJsonPath, "utf-8");

    // Process JSON
    const packageJson = JSON.parse(data);
    packageJson.name = packageName;

    // Write file
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2)
    );
    console.log("package.json created");
  } catch (error) {
    console.error("Error processing package.json. [ERROR]: ", error);
  }
};

module.exports = {
  validateProjectName,
  writePackage,
  writeTheme,
};
