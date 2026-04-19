#!/usr/bin/env python3
"""
Convert SVG icons to PNG for PWA
 
Install required packages:
pip install cairosvg pillow

Then run:
python3 scripts/convert_svg_to_png.py
"""

import os
import sys
from pathlib import Path

def convert_with_cairosvg():
    """Convert using cairosvg (recommended)"""
    try:
        import cairosvg
    except ImportError:
        print("❌ cairosvg not installed")
        print("Install with: pip install cairosvg")
        return False
    
    icons_dir = Path(__file__).parent.parent / "public" / "icons"
    svg_files = list(icons_dir.glob("*.svg"))
    
    if not svg_files:
        print("❌ No SVG files found in public/icons/")
        return False
    
    for svg_file in svg_files:
        png_file = svg_file.with_suffix(".png")
        try:
            cairosvg.svg2png(url=str(svg_file), write_to=str(png_file))
            print(f"✓ Converted {svg_file.name} to PNG")
        except Exception as e:
            print(f"❌ Failed to convert {svg_file.name}: {e}")
            return False
    
    return True


def convert_with_pillow():
    """Convert using Pillow and trace (alternative)"""
    try:
        from PIL import Image
        import io
    except ImportError:
        print("❌ Pillow not installed")
        print("Install with: pip install pillow")
        return False
    
    try:
        import wand.image
    except ImportError:
        print("❌ wand (ImageMagick Python wrapper) not installed")
        print("Install with: pip install wand")
        return False
    
    icons_dir = Path(__file__).parent.parent / "public" / "icons"
    svg_files = list(icons_dir.glob("*.svg"))
    
    if not svg_files:
        print("❌ No SVG files found in public/icons/")
        return False
    
    for svg_file in svg_files:
        png_file = svg_file.with_suffix(".png")
        try:
            with wand.image.Image(filename=str(svg_file)) as img:
                with img.clone() as converted:
                    converted.format = 'png'
                    converted.save(filename=str(png_file))
            print(f"✓ Converted {svg_file.name} to PNG")
        except Exception as e:
            print(f"❌ Failed to convert {svg_file.name}: {e}")
            return False
    
    return True


if __name__ == "__main__":
    print("🎨 PWA Icon SVG to PNG Converter")
    print("=" * 40)
    
    # Try cairosvg first (recommended)
    print("\n1️⃣ Trying cairosvg...")
    if convert_with_cairosvg():
        print("\n✨ All icons converted successfully!")
        print("PNG icons are ready in: public/icons/")
        sys.exit(0)
    
    # Try Pillow with wand as fallback
    print("\n2️⃣ Trying Pillow + Wand (ImageMagick)...")
    if convert_with_pillow():
        print("\n✨ All icons converted successfully!")
        print("PNG icons are ready in: public/icons/")
        sys.exit(0)
    
    # If all fail, provide instructions
    print("\n❌ Could not convert icons automatically")
    print("\n💡 Alternative solutions:")
    print("1. Install ImageMagick and run: convert icon-*.svg ../../icons/icon-*.png")
    print("2. Use online converter: https://cloudconvert.com/svg-to-png")
    print("3. Use ImageMagick: brew install imagemagick (macOS) or apt install imagemagick (Linux)")
    print("4. Use Python: pip install cairosvg && python3 scripts/convert_svg_to_png.py")
    sys.exit(1)
