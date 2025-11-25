#!/usr/bin/env python3
"""
Direct upload to Supabase Storage
"""

import os
import sys
from pathlib import Path
from collections import defaultdict
import json

# Install supabase: pip install supabase
try:
    from supabase import create_client
except ImportError:
    print("Installing supabase-py...")
    os.system("pip install supabase")
    from supabase import create_client

# Configuration
SUPABASE_URL = "https://hyigyyriifuaejqallhm.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5aWd5eXJpaWZ1YWVqcWFsbGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTE5NTQsImV4cCI6MjA3OTU4Nzk1NH0.2EaMAyfUtabmGD8E1CxBmzgJYRHUclBP1i3QZjlz29E"
BUCKET_NAME = "gallery-images"
GALERIA_PATH = Path(__file__).parent / "public" / "galeria"

# Gallery mapping
GALLERY_MAPPING = {
    "erzsebethegy": ("csaladi-hazak", "erzsebethegy"),
    "sagod_to_utca": ("csaladi-hazak", "sagod_to_utca"),
    "ruhagyar": ("ipari-kereskedelmi", "ruhagyar"),
    "salarkitek": ("ipari-kereskedelmi", "salarkitek"),
    "sagod_fj": ("felujitas", "sagod_fj"),
    "gepjarmupark": ("gepjarmupark", "gepjarmupark"),
}

def upload_images():
    """Upload images to Supabase Storage and update database"""

    # Initialize Supabase
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Get all images
    images_by_subcategory = defaultdict(list)

    for subcategory_dir in GALERIA_PATH.iterdir():
        if not subcategory_dir.is_dir():
            continue

        subcategory_id = subcategory_dir.name
        if subcategory_id not in GALLERY_MAPPING:
            print(f"Warning: Unknown subcategory '{subcategory_id}', skipping...")
            continue

        gallery_id, sub_id = GALLERY_MAPPING[subcategory_id]
        webp_files = sorted(subcategory_dir.glob("*.webp"))

        images_by_subcategory[(gallery_id, sub_id)] = webp_files

    total_images = sum(len(files) for files in images_by_subcategory.values())
    print(f"Found {total_images} images to upload")
    print()

    uploaded_count = 0
    failed_count = 0
    uploaded_files = defaultdict(lambda: defaultdict(list))

    # Upload each image
    for (gallery_id, subcategory_id), image_files in sorted(images_by_subcategory.items()):
        print(f"Uploading to {gallery_id} → {subcategory_id} ({len(image_files)} images)...")

        for image_path in image_files:
            try:
                # Upload to storage
                with open(image_path, 'rb') as f:
                    file_path = f"{subcategory_id}/{image_path.name}"
                    response = supabase.storage.from_(BUCKET_NAME).upload(
                        path=file_path,
                        file=f.read(),
                        file_options={"content-type": "image/webp"}
                    )

                uploaded_files[gallery_id][subcategory_id].append(file_path)
                uploaded_count += 1
                print(f"  ✓ {image_path.name}")

            except Exception as e:
                print(f"  ✗ {image_path.name}: {str(e)}")
                failed_count += 1

        print()

    # Update database with new image paths
    if uploaded_files:
        print("Updating database...")
        try:
            # Get current galleries data
            response = supabase.table("galleries").select("*").execute()
            galleries_data = {row['id']: row['data'] for row in response.data}

            # Update image paths
            for gallery_id, subcats in uploaded_files.items():
                if gallery_id in galleries_data:
                    gallery = galleries_data[gallery_id]
                    for subcat in gallery['subcategories']:
                        if subcat['id'] in subcats:
                            # Add new images to existing ones
                            existing = set(subcat.get('images', []))
                            new_images = subcats[subcat['id']]
                            subcat['images'] = list(existing | set(new_images))

                    # Update in database
                    supabase.table("galleries").update({"data": gallery}).eq("id", gallery_id).execute()
                    print(f"  ✓ Updated {gallery_id}")

            print()
        except Exception as e:
            print(f"Error updating database: {e}")

    print("=" * 50)
    print(f"Upload complete!")
    print(f"  Uploaded: {uploaded_count}")
    print(f"  Failed: {failed_count}")
    print(f"  Total: {uploaded_count + failed_count}")

if __name__ == "__main__":
    upload_images()
