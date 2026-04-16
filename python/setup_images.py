#!/usr/bin/env python3
"""
Script to automatically populate product images from the images folder.
This fills in missing images throughout the website using the available local images.
"""

import os
import re
from pathlib import Path

# Base directory
base_dir = Path(__file__).parent.parent
images_dir = base_dir / 'images'
html_files = {
    'wishlist_modal': base_dir / 'pages' / 'modals' / 'wishlist-modal.html',
    'product_detail': base_dir / 'pages' / 'modals' / 'product-detail-modal.html',
    'bestsellers': base_dir / 'pages' / 'bestsellers-fragment.html'
}

# Get available images sorted
available_images = sorted([f.name for f in images_dir.glob('img-*.jpeg')] + 
                         [f.name for f in images_dir.glob('img-*.png')])

print(f"✓ Found {len(available_images)} images in the images folder")
print(f"  Range: {available_images[0]} to {available_images[-1]}")

# 1. Update wishlist-modal.html (12 products with main + hover images)
print("\n📸 Updating wishlist-modal.html...")
wishlist_file = html_files['wishlist_modal']
if wishlist_file.exists():
    content = wishlist_file.read_text('utf-8')
    
    # Map images: 12 products need 24 images (main + hover)
    # Use images 0-23 for products
    for product_id in range(12):
        main_img_idx = product_id * 2
        hover_img_idx = product_id * 2 + 1
        
        if main_img_idx < len(available_images):
            # Replace main image
            old_main = f'<img id="catalog-main-{product_id}" loading="lazy" loading="lazy" src="images/img-\\d+\\.(jpeg|png)">'
            new_main = f'<img id="catalog-main-{product_id}" loading="lazy" loading="lazy" src="images/{available_images[main_img_idx]}">'
            content = re.sub(old_main, new_main, content)
            
        if hover_img_idx < len(available_images):
            # Replace hover image
            old_hover = f'<img id="catalog-hover-{product_id}" loading="lazy" loading="lazy" src="images/img-\\d+\\.(jpeg|png)">'
            new_hover = f'<img id="catalog-hover-{product_id}" loading="lazy" loading="lazy" src="images/{available_images[hover_img_idx]}">'
            content = re.sub(old_hover, new_hover, content)
    
    wishlist_file.write_text(content, 'utf-8')
    print(f"  ✓ Updated wishlist-modal.html with images img-0 to img-23")

# 2. Update product-detail-modal.html
print("\n📸 Updating product-detail-modal.html...")
product_detail_file = html_files['product_detail']
if product_detail_file.exists():
    content = product_detail_file.read_text('utf-8')
    
    # Update thumbnail images (typically 4-5 per product)
    # Use images 24+ for product detail thumbnails
    for i in range(min(4, len(available_images) - 24)):
        img_num = 24 + i
        if img_num < len(available_images):
            # Replace any thumbnail references
            pattern = f'id="pdThumbImg{i+1}"[^>]*src="[^"]*"'
            replacement = f'id="pdThumbImg{i+1}" src="images/{available_images[img_num]}"'
            content = re.sub(pattern, replacement, content)
    
    product_detail_file.write_text(content, 'utf-8')
    print(f"  ✓ Updated product-detail-modal.html")

# 3. Update bestsellers-fragment.html
print("\n📸 Updating bestsellers-fragment.html...")
bestsellers_file = html_files['bestsellers']
if bestsellers_file.exists():
    content = bestsellers_file.read_text('utf-8')
    
    # Update collection banner image
    content = re.sub(
        r'collection-bg-img[^>]*src="[^"]*"',
        f'collection-bg-img" src="images/{available_images[20]}"',
        content
    )
    
    bestsellers_file.write_text(content, 'utf-8')
    print(f"  ✓ Updated bestsellers-fragment.html banner")

print("\n✅ Image setup complete!")
print("\nImage allocation summary:")
print("  • Products 0-11: images img-0 to img-23 (main + hover)")
print("  • Product detail thumbs: images img-24 to img-27")
print("  • Banners: images img-20 onwards")
print(f"  • Remaining images available: img-28 to img-{len(available_images)-1}")
