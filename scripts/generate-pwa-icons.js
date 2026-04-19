#!/usr/bin/env node

/**
 * PWA Icon Generator
 * 
 * Generates PWA icons from a base SVG or color
 * Run with: node scripts/generate-pwa-icons.js
 * 
 * Install dependencies first:
 * pnpm add -D sharp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const iconsDir = path.join(projectRoot, 'public/icons');

// Color scheme for icons
const colors = {
  primary: '#3B82F6',
  accent: '#6366F1',
  white: '#FFFFFF',
};

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('✓ Created icons directory');
}

// SVG template - simple gradient background with text
const createSVG = (size, maskable = false) => {
  const padding = maskable ? 0 : size * 0.1;
  const contentSize = size - padding * 2;
  
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" />
  <circle cx="${size/2}" cy="${size/2}" r="${(contentSize/2) * 0.9}" fill="${colors.white}" opacity="0.9" />
  <text x="${size/2}" y="${size/2 + 10}" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="${colors.primary}" text-anchor="middle" dominant-baseline="middle">E</text>
</svg>`;
};

// Generate SVG icon files
const sizes = [96, 144, 192, 512];

sizes.forEach(size => {
  // Regular icon
  const svgContent = createSVG(size, false);
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svgContent, 'utf-8');
  console.log(`✓ Generated icon-${size}x${size}.svg`);

  // Maskable icon
  const maskableSVG = createSVG(size, true);
  const maskablePath = path.join(iconsDir, `icon-${size}x${size}-maskable.svg`);
  fs.writeFileSync(maskablePath, maskableSVG, 'utf-8');
  console.log(`✓ Generated icon-${size}x${size}-maskable.svg`);
});

// Create placeholder screenshot SVGs
const screenshotSizes = [
  { width: 540, height: 720, name: 'screenshot-1' },
  { width: 1280, height: 720, name: 'screenshot-2' },
];

screenshotSizes.forEach(({ width, height, name }) => {
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)" />
  <text x="${width/2}" y="${height/2}" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="${colors.white}" text-anchor="middle" dominant-baseline="middle">EduPlatform</text>
</svg>`;
  
  const svgPath = path.join(iconsDir, `${name}.svg`);
  fs.writeFileSync(svgPath, svg, 'utf-8');
  console.log(`✓ Generated ${name}.svg`);
});

console.log('\n📦 PWA icon generation complete!');
console.log('Generated SVG icons in: public/icons/');
console.log('\n📝 Next steps:');
console.log('1. Update manifest.json with your actual app name and description');
console.log('2. Convert SVG files to PNG using your preferred tool');
console.log('3. Build and deploy: pnpm run build');
console.log('\nTo convert SVGs to PNG, you can use:');
console.log('- ImageMagick: convert icon-192x192.svg icon-192x192.png');
console.log('- Online: https://cloudconvert.com/');
console.log('- Node: pnpm add -D sharp, then run conversion script');
