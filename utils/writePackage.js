const fs = require("fs");
const path = require("path");

const writePackage = async (targetDir, packageName) => {
  const packageJsonPath = path.join(targetDir, "package.json");
  try {
    // Read file
    const data = fs.readFileSync(packageJsonPath, "utf-8");

    // Process JSON
    const packageJson = JSON.parse(data);
    packageJson.name = packageName;

    // Write file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("Successfully created package.json");
  } catch (error) {
    console.error("Error processing package.json. [ERROR]: ", error);
  }
};

module.exports = {
  writePackage,
};
