import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.join(__dirname, '../frontend');
const backendPublicDir = path.join(__dirname, 'public');
const frontendDistDir = path.join(frontendDir, 'dist');

console.log('--- Starting Build Process ---');

try {
  // 1. Build Frontend
  console.log('\n[1/3] Building Frontend...');
  execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });
  execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

  // 2. Generate Prisma Client
  console.log('\n[2/3] Generating Prisma Client...');
  execSync('npx prisma generate', { cwd: __dirname, stdio: 'inherit' });

  // 3. Copy Frontend Dist to Backend Public
  console.log('\n[3/3] Copying frontend build to backend public folder...');
  if (fs.existsSync(backendPublicDir)) {
    fs.rmSync(backendPublicDir, { recursive: true, force: true });
  }
  fs.cpSync(frontendDistDir, backendPublicDir, { recursive: true });

  console.log('\n✅ Build Completed Successfully!');
  console.log('You can now upload the contents of the /backend folder directly to MonsterASP /wwwroot.');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}
