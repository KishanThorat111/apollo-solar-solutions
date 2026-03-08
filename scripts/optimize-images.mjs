import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'public/images';
const tempDir = 'public/images_temp';

// Create temp dir
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

console.log(`Optimizing ${files.length} images...\n`);

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const name = path.parse(file).name;
  const webpOut = path.join(tempDir, `${name}.webp`);
  const jpgOut = path.join(tempDir, file);

  const origSize = fs.statSync(inputPath).size;

  // Create WebP version (primary - much smaller)
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(webpOut);

  // Also compress original JPG as fallback
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(jpgOut);

  const webpSize = fs.statSync(webpOut).size;
  const jpgSize = fs.statSync(jpgOut).size;

  console.log(
    `${file}: ${(origSize/1024).toFixed(0)}KB → WebP: ${(webpSize/1024).toFixed(0)}KB (${((1 - webpSize/origSize)*100).toFixed(0)}% smaller) | JPG: ${(jpgSize/1024).toFixed(0)}KB`
  );
}

// Move optimized files back
for (const file of fs.readdirSync(tempDir)) {
  fs.renameSync(path.join(tempDir, file), path.join(inputDir, file));
}
fs.rmdirSync(tempDir);

console.log('\nDone! WebP + compressed JPG fallbacks created.');
