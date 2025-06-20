const {
  readFileSync,
  copyFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} = require("fs");
const path = require("path");

const TEMPLATES = {
  sketch: "SketchTemplate",
};

function convertToSlug(componentName) {
  return (
    componentName
      .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
      // .replace(/[^a-z0-9-]+/g, "-") // Remove special characters
      .toLowerCase()
  );
}

function findAndReplaceInFile(sourceFilePath, replaceSearch, replaceTerm) {
  var data = readFileSync(sourceFilePath, "utf-8");

  var newValue = data.replaceAll(replaceSearch, replaceTerm);

  writeFileSync(sourceFilePath, newValue, "utf-8");
}

const generateSketch = async () => {
  if (process.argv.length < 3)
    throw new Error(
      "Please provide a name for a new React component for sketching (e.g. 'SketchExample')"
    );

  const sketchName = process.argv[2];
  let template = process.argv[3];
  if (!template) template = "sketch";

  console.log(`⚙️ Creating a new sketch called <${sketchName} />`);

  // Get template for component and copy it
  const templateFilename = TEMPLATES[template];
  const componentTemplatePath = path.join(
    __dirname,
    "../templates",
    `${templateFilename}.tsx`
  );
  const componentParentPath = path.join(
    __dirname,
    "../src/sketches/",
    `${sketchName}`
  );
  const componentDestinationPath = path.join(
    componentParentPath,
    `${sketchName}.tsx`
  );
  const componentFileExists = existsSync(componentParentPath);
  if (componentFileExists) {
    console.error(
      "Component already exists! Try picking another name or deleting the old file."
    );
    return;
  }

  // Create folder
  mkdirSync(componentParentPath);

  // Copy file
  copyFileSync(componentTemplatePath, componentDestinationPath);

  // Swap out placeholder name
  findAndReplaceInFile(
    componentDestinationPath,
    "ExampleComponent",
    sketchName
  );

  // Get template for page and copy it
  const pageTemplatePath = path.join(__dirname, "../templates", "page.tsx");
  const pageName = convertToSlug(sketchName);
  const pageDestinationPath = path.join(
    __dirname,
    "../src/pages/sketches/",
    `${pageName}.tsx`
  );
  copyFileSync(pageTemplatePath, pageDestinationPath);

  // Swap out placeholder name
  findAndReplaceInFile(pageDestinationPath, "ExampleComponent", sketchName);

  // Done!
  console.log("Done! 🤘");
  console.log(`Created new sketch component: ${componentDestinationPath}`);
  console.log(`Created new sketch page: ${pageDestinationPath}`);
  const url = `http://localhost:3000/sketches/${pageName}`;
  console.log(`Live preview: ${url}`);
};

generateSketch();
