const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Helper to get all files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (/\.(js|jsx|ts|tsx)$/.test(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Step 1: Convert all relative imports inside `src` to absolute `@/` imports
console.log('Step 1: Converting relative imports to @/ ...');
const allFiles = getAllFiles(srcDir);

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Regex to match `import ... from "..."` and `import "..."` and `export ... from "..."`
  const importRegex = /(?:import|export)\s+.*?(?:from\s+)?['"]([^'"]+)['"]/g;
  
  content = content.replace(importRegex, (match, importPath) => {
    // Only process relative imports starting with `.` or `..`
    if (importPath.startsWith('.')) {
      // Resolve the absolute path of the import
      const absoluteImportPath = path.resolve(path.dirname(filePath), importPath);
      
      // Check if it's inside `src`
      if (absoluteImportPath.startsWith(srcDir)) {
        // Convert to @/...
        let newImportPath = '@/' + path.relative(srcDir, absoluteImportPath).replace(/\\/g, '/');
        modified = true;
        return match.replace(importPath, newImportPath);
      }
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

// Step 2: Move directories
console.log('Step 2: Moving directories...');
const moves = [
  { from: 'components/1-header', to: 'components/layout/Header' },
  { from: 'components/2-hero', to: 'components/layout/Hero' },
  { from: 'components/6-footer', to: 'components/layout/Footer' },
  { from: 'components/4-main', to: 'features/projects/components/Main' },
  { from: 'components/3-featured', to: 'features/projects/components/Featured' },
  { from: 'components/project-details', to: 'features/projects/components/ProjectDetails' },
  { from: 'components/5-contact', to: 'features/contact/components' },
  { from: 'components/admin', to: 'features/admin' },
  { from: 'components/shared', to: 'components/ui' }
];

// Ensure target directories exist
const dirsToCreate = [
  'features/projects/components',
  'features/contact',
  'components/layout',
  'pages'
];

for (const dir of dirsToCreate) {
  const fullPath = path.join(srcDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

for (const move of moves) {
  const fromPath = path.join(srcDir, move.from);
  const toPath = path.join(srcDir, move.to);
  if (fs.existsSync(fromPath)) {
    fs.cpSync(fromPath, toPath, { recursive: true });
    fs.rmSync(fromPath, { recursive: true, force: true });
    console.log(`Moved ${move.from} -> ${move.to}`);
  }
}

// Step 3: Update @/... imports to reflect new locations
console.log('Step 3: Updating @/ imports...');
const allFilesAfterMove = getAllFiles(srcDir);

for (const filePath of allFilesAfterMove) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  for (const move of moves) {
    // We want to replace `@/components/1-header` with `@/components/layout/Header`
    // Ensure we match it exactly by adding a boundary, like `/` or end of string.
    const searchString = `@/${move.from}`;
    const replaceString = `@/${move.to}`;
    
    // Simple string replace for all occurrences
    if (content.includes(searchString)) {
      content = content.split(searchString).join(replaceString);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

console.log('Refactoring complete!');
