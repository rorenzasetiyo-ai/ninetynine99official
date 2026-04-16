#!/usr/bin/env python3
from PIL import Image
import os
import glob

img_dir = 'images'
quality = 75  # JPEG quality (0-100)
saved = 0
original_size = 0
new_size = 0

for img_file in sorted(glob.glob(os.path.join(img_dir, '*.jpeg'))):
    try:
        img = Image.open(img_file)
        original_size += os.path.getsize(img_file)
        
        # Save with reduced quality
        img.save(img_file, 'JPEG', quality=quality, optimize=True)
        new_size += os.path.getsize(img_file)
        
        saved += 1
        if saved % 10 == 0:
            print(f"✓ {saved} images compressed...")
    except Exception as e:
        print(f"✗ Failed to compress {img_file}: {e}")

reduction = ((original_size - new_size) / original_size * 100) if original_size > 0 else 0
print(f"\n✅ Compressed {saved} images")
print(f"   Before: {original_size/1024/1024:.1f}MB")
print(f"   After:  {new_size/1024/1024:.1f}MB")
print(f"   Saved:  {reduction:.1f}% ({(original_size-new_size)/1024/1024:.1f}MB)")
