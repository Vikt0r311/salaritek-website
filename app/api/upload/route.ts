import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SalamonCsaba';
const GALLERIES_JSON_PATH = path.join(process.cwd(), 'public', 'galleries.json');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const password = formData.get('password') as string;
    const galleryId = formData.get('galleryId') as string;
    const subcategoryId = formData.get('subcategoryId') as string;
    const files = formData.getAll('files') as File[];

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (!galleryId || !subcategoryId || files.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read current galleries data
    const galleriesData = JSON.parse(
      fs.readFileSync(GALLERIES_JSON_PATH, 'utf-8')
    );

    // Find the gallery and subcategory
    const gallery = galleriesData.galleries.find(
      (g: any) => g.id === galleryId
    );
    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    const subcategory = gallery.subcategories.find(
      (s: any) => s.id === subcategoryId
    );
    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Get next image number
    const nextNumber = subcategory.images.length + 1;
    const uploadedImages: string[] = [];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = await file.arrayBuffer();

      // Convert to WebP
      const imageName = `Image${String(nextNumber + i).padStart(2, '0')}.webp`;
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

      try {
        // Upload to Supabase Storage
        const filePath = `${subcategoryId}/${imageName}`;
        const { error: uploadError } = await supabase.storage
          .from('galeria')
          .upload(filePath, webpBuffer, {
            contentType: 'image/webp',
            upsert: false,
          });

        if (uploadError) {
          console.error(`Error uploading ${imageName}:`, uploadError);
          continue;
        }

        // Also save locally for fallback
        const galeriaPath = path.join(
          process.cwd(),
          'public',
          'galeria',
          subcategoryId
        );
        if (!fs.existsSync(galeriaPath)) {
          fs.mkdirSync(galeriaPath, { recursive: true });
        }
        const imagePath = path.join(galeriaPath, imageName);
        fs.writeFileSync(imagePath, webpBuffer);

        const imageNameWithPath = filePath;
        uploadedImages.push(imageNameWithPath);
        subcategory.images.push(imageNameWithPath);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    // Update galleries.json
    fs.writeFileSync(
      GALLERIES_JSON_PATH,
      JSON.stringify(galleriesData, null, 2)
    );

    return NextResponse.json({
      success: true,
      uploadedImages,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
