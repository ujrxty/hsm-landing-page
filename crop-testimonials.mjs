import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

const inputDir = './public/testimonials';
const outputDir = './public/testimonials-cropped';

async function cropToContent(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Find the last row that contains any bright pixels (actual content)
    // Chat bubbles have white/colored text and backgrounds with pixels > 80
    let lastContentRow = height - 1;

    for (let y = height - 1; y >= 0; y--) {
      let hasBrightPixel = false;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Check if any color channel is bright (indicating actual content)
        if (r > 80 || g > 80 || b > 80) {
          hasBrightPixel = true;
          break;
        }
      }

      if (hasBrightPixel) {
        lastContentRow = y;
        break;
      }
    }

    // Add a small padding below content
    const padding = 20;
    const cropHeight = Math.min(lastContentRow + padding, height);

    // Only crop if we're removing significant black space (at least 100px)
    if (height - cropHeight > 100) {
      await sharp(inputPath)
        .extract({ left: 0, top: 0, width: width, height: cropHeight })
        .toFile(outputPath);
      console.log(`Cropped ${inputPath}: ${height} -> ${cropHeight} (removed ${height - cropHeight}px)`);
    } else {
      // Keep original if no significant cropping needed
      await sharp(inputPath).toFile(outputPath);
    }

    return true;
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err.message);
    return false;
  }
}

async function main() {
  try {
    await mkdir(outputDir, { recursive: true });

    const files = await readdir(inputDir);
    const jpegFiles = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

    console.log(`Processing ${jpegFiles.length} images...`);

    let processed = 0;
    for (const file of jpegFiles) {
      const inputPath = join(inputDir, file);
      const outputPath = join(outputDir, file);

      const success = await cropToContent(inputPath, outputPath);
      if (success) processed++;
    }

    console.log(`\nDone! Processed ${processed} images to ${outputDir}`);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
