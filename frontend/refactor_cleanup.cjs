const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Helper to get all files
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
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

const dirsToCreate = ['providers', 'api', 'hooks', 'utils', 'config'];
for (const dir of dirsToCreate) {
  const fullPath = path.join(srcDir, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
}

// Moves
const moves = [
  { from: 'contexts/ThemeContext.jsx', to: 'providers/ThemeContext.jsx' },
  { from: 'theme/GlobalTheme.jsx', to: 'providers/GlobalTheme.jsx' },
  { from: 'services/httpClient.js', to: 'api/httpClient.js' },
  { from: 'constants/constants.js', to: 'config/index.js' }
];

for (const move of moves) {
  const fromPath = path.join(srcDir, move.from);
  const toPath = path.join(srcDir, move.to);
  if (fs.existsSync(fromPath)) {
    fs.cpSync(fromPath, toPath, { recursive: true });
    fs.rmSync(fromPath, { force: true });
    console.log(`Moved ${move.from} -> ${move.to}`);
  }
}

// Remove empty directories and imports.js
const toDelete = ['contexts', 'theme', 'services', 'constants', 'imports.js'];
for (const item of toDelete) {
  const itemPath = path.join(srcDir, item);
  if (fs.existsSync(itemPath)) {
    fs.rmSync(itemPath, { recursive: true, force: true });
  }
}

// Update imports across all files
const allFiles = getAllFiles(srcDir);
for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  const replacements = [
    { search: '@/contexts/ThemeContext', replace: '@/providers/ThemeContext' },
    { search: '@/theme/GlobalTheme', replace: '@/providers/GlobalTheme' },
    { search: '@/services/httpClient', replace: '@/api/httpClient' },
    { search: '@/constants/constants', replace: '@/config' },
  ];

  for (const rep of replacements) {
    if (content.includes(rep.search)) {
      content = content.split(rep.search).join(rep.replace);
      modified = true;
    }
  }

  // Remove `import { ... } from "@/imports"` and replace with direct imports
  if (content.includes('from "@/imports"')) {
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']@\/imports["'];?/, (match, group) => {
      const vars = group.split(',').map(s => s.trim()).filter(Boolean);
      let newImports = '';
      for (const v of vars) {
        if (v === 'Hero') newImports += 'import Hero from "@/components/layout/Hero/Hero";\n';
        if (v === 'Header') newImports += 'import Header from "@/components/layout/Header/Header";\n';
        if (v === 'Main') newImports += 'import Main from "@/features/projects/components/Main/Main";\n';
        if (v === 'Contact') newImports += 'import Contact from "@/features/contact/components/Contact";\n';
        if (v === 'Footer') newImports += 'import Footer from "@/components/layout/Footer/Footer";\n';
      }
      return newImports.trim();
    });
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

console.log('Cleanup refactoring complete!');
