#!/usr/bin/env node

/**
 * SVG to PNG Icon Converter for PWA
 * Converts SVG icons to PNG format required by manifests
 * 
 * Run with: node scripts/convert-icons-to-png.js
 * 
 * Install dependencies first:
 * pnpm add -D sharp
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const iconsDir = path.join(projectRoot, 'public/icons');

async function convertSVGToPNG() {
  try {
    const iconSizes = [96, 144, 192, 512];
    
    for (const size of iconSizes) {
      // Convert regular icon
      const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
      const pngPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      
      if (fs.existsSync(svgPath)) {
        await sharp(svgPath)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(pngPath);
        console.log(`✓ Converted icon-${size}x${size}.svg to PNG`);
      }

      // Convert maskable icon
      const maskableSvgPath = path.join(iconsDir, `icon-${size}x${size}-maskable.svg`);
      const maskablePngPath = path.join(iconsDir, `icon-${size}x${size}-maskable.png`);
      
      if (fs.existsSync(maskableSvgPath)) {
        await sharp(maskableSvgPath)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(maskablePngPath);
        console.log(`✓ Converted icon-${size}x${size}-maskable.svg to PNG`);
      }
    }

    // Convert screenshots
    const screenshots = [
      { name: 'screenshot-1', width: 540, height: 720 },
      { name: 'screenshot-2', width: 1280, height: 720 },
    ];

    for (const { name, width, height } of screenshots) {
      const svgPath = path.join(iconsDir, `${name}.svg`);
      const pngPath = path.join(iconsDir, `${name}.png`);
      
      if (fs.existsSync(svgPath)) {
        await sharp(svgPath)
          .resize(width, height, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(pngPath);
        console.log(`✓ Converted ${name}.svg to PNG`);
      }
    }

    console.log('\n✨ All icons converted successfully!');
    console.log('PNG icons are ready in: public/icons/');
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cannot find module')) {
      console.error('❌ Error: sharp module not found');
      console.error('Install it with: pnpm add -D sharp');
    } else {
      console.error('❌ Error converting icons:', error);
    }
    process.exit(1);
  }
}

convertSVGToPNG();
